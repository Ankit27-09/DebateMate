"""
Room API Endpoints
Handles room creation, token generation, and room lifecycle.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from services.room_service import room_service
from services.token_service import token_service
from services.debate_state import debate_state_manager

router = APIRouter()


class CreateRoomRequest(BaseModel):
    """Request to create a new debate room."""
    topic: str
    num_agents: int = 4
    user_role: Optional[str] = None  # PRO, CON, or None for observer
    user_name: str = "User"
    difficulty: str = "beginner"


class CreateRoomResponse(BaseModel):
    """Response with room details and user token."""
    debate_id: str
    room_name: str
    user_token: str
    topic: str
    agents: list[dict]


class TokenRequest(BaseModel):
    """Request for a participant token."""
    participant_name: str
    is_agent: bool = False
    agent_id: Optional[str] = None
    role: Optional[str] = None


@router.post("/create", response_model=CreateRoomResponse)
async def create_room(request: CreateRoomRequest):
    """
    Create a new debate room and return user token.
    
    This endpoint:
    1. Creates a debate session with configuration
    2. Creates a LiveKit room
    3. Generates an access token for the user
    """
    import traceback
    import logging
    logger = logging.getLogger(__name__)
    
    try:
        # Validate agent count
        if request.num_agents < 2 or request.num_agents > 6:
            raise HTTPException(
                status_code=400,
                detail="Number of agents must be between 2 and 6"
            )
        
        logger.info(f"Creating debate session for topic: {request.topic}")
        
        # Create debate session
        session = debate_state_manager.create_session(
            topic=request.topic,
            num_agents=request.num_agents,
            user_role=request.user_role,
            difficulty=request.difficulty
        )
        logger.info(f"Session created: {session.debate_id}")
        
        # Create LiveKit room with debate config as metadata
        import json
        room_metadata = json.dumps({
            "topic": request.topic,
            "num_agents": request.num_agents,
            "user_role": request.user_role,
            "difficulty": request.difficulty,
            "agents": [a.to_dict() for a in session.config.agents]
        })
        
        await room_service.create_room(
            room_name=session.room_name,
            max_participants=request.num_agents + 3,
            metadata=room_metadata
        )
        logger.info(f"Room created: {session.room_name}")
        
        # Generate user token
        logger.info("Generating user token...")
        user_token = token_service.generate_user_token(
            room_name=session.room_name,
            user_id=session.debate_id,
            user_name=request.user_name
        )
        logger.info("Token generated successfully")
        
        return CreateRoomResponse(
            debate_id=session.debate_id,
            room_name=session.room_name,
            user_token=user_token,
            topic=request.topic,
            agents=[a.to_dict() for a in session.config.agents]
        )
        
    except Exception as e:
        logger.error(f"Error creating room: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{room_name}/token")
async def get_token(
    room_name: str,
    participant_name: str,
    is_agent: bool = False,
    agent_id: str = None,
    role: str = None
):
    """Generate an access token for a participant."""
    try:
        if is_agent:
            if not agent_id:
                raise HTTPException(
                    status_code=400,
                    detail="agent_id required for agent tokens"
                )
            token = token_service.generate_agent_token(
                room_name=room_name,
                agent_id=agent_id,
                agent_name=participant_name,
                role=role or "AGENT"
            )
        else:
            token = token_service.generate_user_token(
                room_name=room_name,
                user_id=participant_name.lower().replace(" ", "_"),
                user_name=participant_name
            )
        
        return {"token": token}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{room_name}/participants")
async def list_participants(room_name: str):
    """List all participants in a room."""
    try:
        participants = await room_service.list_participants(room_name)
        return {
            "room_name": room_name,
            "participants": [
                {
                    "identity": p.identity,
                    "name": p.name,
                    "is_speaking": p.is_speaking,
                    "joined_at": p.joined_at
                }
                for p in participants
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{room_name}")
async def delete_room(room_name: str):
    """Delete a room and end the debate session."""
    try:
        # Delete from LiveKit
        await room_service.delete_room(room_name)
        
        # Delete session
        session = debate_state_manager.get_session_by_room(room_name)
        if session:
            debate_state_manager.delete_session(session.debate_id)
        
        return {"status": "deleted", "room_name": room_name}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
async def list_rooms():
    """List all active debate rooms."""
    try:
        rooms = await room_service.list_rooms()
        return {
            "rooms": [
                {
                    "name": r.name,
                    "num_participants": r.num_participants,
                    "created_at": r.creation_time
                }
                for r in rooms
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
