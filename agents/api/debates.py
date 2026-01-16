"""
Debate API Endpoints
Handles debate configuration, state, and real-time updates.
"""
from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import Optional
import json
import asyncio

from services.debate_state import (
    debate_state_manager,
    DebateStatus,
    Role
)
from services.turn_manager import Participant

router = APIRouter()


class ConfigureDebateRequest(BaseModel):
    """Request to configure a debate session."""
    topic: str
    num_agents: int = 4
    user_role: Optional[str] = None
    difficulty: str = "beginner"
    turn_duration: int = 45


class UpdateStatusRequest(BaseModel):
    """Request to update debate status."""
    status: str


class RecordTurnRequest(BaseModel):
    """Request to record a completed turn."""
    speaker_id: str
    content: str


@router.post("/configure")
async def configure_debate(request: ConfigureDebateRequest):
    """
    Configure a new debate session.
    
    Returns the debate configuration including generated agents.
    """
    try:
        session = debate_state_manager.create_session(
            topic=request.topic,
            num_agents=request.num_agents,
            user_role=request.user_role,
            difficulty=request.difficulty,
            turn_duration=request.turn_duration
        )
        
        return {
            "debate_id": session.debate_id,
            "room_name": session.room_name,
            "config": {
                "topic": session.config.topic,
                "num_agents": session.config.num_agents,
                "user_role": session.config.user_role.value if session.config.user_role else None,
                "difficulty": session.config.difficulty,
                "turn_duration": session.config.turn_duration,
                "agents": [a.to_dict() for a in session.config.agents]
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{debate_id}")
async def get_debate(debate_id: str):
    """Get debate session state."""
    session = debate_state_manager.get_session(debate_id)
    if not session:
        raise HTTPException(status_code=404, detail="Debate not found")
    
    return session.to_dict()


@router.get("/{debate_id}/state")
async def get_debate_state(debate_id: str):
    """Get current debate state including turn info."""
    session = debate_state_manager.get_session(debate_id)
    if not session:
        raise HTTPException(status_code=404, detail="Debate not found")
    
    tm = session.turn_manager
    
    return {
        "debate_id": debate_id,
        "status": session.status.value,
        "topic": session.config.topic,
        "current_speaker": tm.current_turn.speaker_name if tm.current_turn else None,
        "current_turn_duration": tm.get_turn_duration(),
        "is_overtime": tm.is_turn_overtime(),
        "stats": tm.get_stats(),
        "history": tm.get_debate_history(5)
    }


@router.post("/{debate_id}/status")
async def update_debate_status(debate_id: str, request: UpdateStatusRequest):
    """Update debate session status."""
    try:
        status = DebateStatus(request.status)
    except ValueError:
        raise HTTPException(status_code=400, detail=f"Invalid status: {request.status}")
    
    success = debate_state_manager.update_status(debate_id, status)
    if not success:
        raise HTTPException(status_code=404, detail="Debate not found")
    
    return {"debate_id": debate_id, "status": status.value}


@router.post("/{debate_id}/turn")
async def record_turn(debate_id: str, request: RecordTurnRequest):
    """Record a completed speaking turn."""
    turn = debate_state_manager.add_turn(
        debate_id=debate_id,
        speaker_id=request.speaker_id,
        content=request.content
    )
    
    if not turn:
        raise HTTPException(status_code=404, detail="Debate or speaker not found")
    
    return {
        "speaker": turn.speaker_name,
        "role": turn.role.value,
        "duration": turn.ended_at - turn.started_at if turn.ended_at else 0
    }


@router.get("/{debate_id}/history")
async def get_debate_history(debate_id: str, last_n: int = 10):
    """Get recent debate history."""
    history = debate_state_manager.get_debate_history(debate_id, last_n)
    return {"debate_id": debate_id, "history": history}


@router.get("/{debate_id}/next-speaker")
async def get_next_speaker(debate_id: str):
    """Get the next speaker based on turn algorithm."""
    session = debate_state_manager.get_session(debate_id)
    if not session:
        raise HTTPException(status_code=404, detail="Debate not found")
    
    next_speaker = session.turn_manager.get_next_speaker()
    if not next_speaker:
        return {"next_speaker": None}
    
    return {
        "speaker_id": next_speaker.id,
        "speaker_name": next_speaker.name,
        "role": next_speaker.role.value,
        "is_user": next_speaker.is_user
    }


@router.delete("/{debate_id}")
async def delete_debate(debate_id: str):
    """Delete a debate session."""
    success = debate_state_manager.delete_session(debate_id)
    if not success:
        raise HTTPException(status_code=404, detail="Debate not found")
    
    return {"status": "deleted", "debate_id": debate_id}


@router.get("/")
async def list_debates():
    """List all active debate sessions."""
    return {"debates": debate_state_manager.get_all_sessions()}


# WebSocket connection manager
class ConnectionManager:
    """Manages WebSocket connections for real-time updates."""
    
    def __init__(self):
        self.active_connections: dict[str, list[WebSocket]] = {}
    
    async def connect(self, debate_id: str, websocket: WebSocket):
        await websocket.accept()
        if debate_id not in self.active_connections:
            self.active_connections[debate_id] = []
        self.active_connections[debate_id].append(websocket)
    
    def disconnect(self, debate_id: str, websocket: WebSocket):
        if debate_id in self.active_connections:
            self.active_connections[debate_id].remove(websocket)
    
    async def broadcast(self, debate_id: str, message: dict):
        if debate_id in self.active_connections:
            for connection in self.active_connections[debate_id]:
                try:
                    await connection.send_json(message)
                except:
                    pass


manager = ConnectionManager()


@router.websocket("/{debate_id}/ws")
async def debate_websocket(websocket: WebSocket, debate_id: str):
    """
    WebSocket endpoint for real-time debate updates.
    
    Sends:
    - turn_start: New speaker starting
    - turn_end: Speaker finished
    - status_change: Debate status changed
    - time_warning: Speaker approaching time limit
    """
    session = debate_state_manager.get_session(debate_id)
    if not session:
        await websocket.close(code=4004)
        return
    
    await manager.connect(debate_id, websocket)
    
    try:
        # Send initial state
        await websocket.send_json({
            "type": "connected",
            "debate_id": debate_id,
            "state": session.to_dict()
        })
        
        while True:
            # Wait for messages from client
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            if message.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
            
            elif message.get("type") == "get_state":
                session = debate_state_manager.get_session(debate_id)
                if session:
                    await websocket.send_json({
                        "type": "state",
                        "state": session.to_dict()
                    })
                    
    except WebSocketDisconnect:
        manager.disconnect(debate_id, websocket)
    except Exception as e:
        manager.disconnect(debate_id, websocket)
