"""
Room Management Service
Handles LiveKit room creation, listing, and deletion.
"""
import logging
from typing import Optional
from livekit import api
from config import settings

logger = logging.getLogger(__name__)


class RoomService:
    """Service for managing LiveKit rooms."""
    
    def __init__(self):
        self.livekit_api = api.LiveKitAPI(
            url=settings.LIVEKIT_URL,
            api_key=settings.LIVEKIT_API_KEY,
            api_secret=settings.LIVEKIT_API_SECRET
        )
    
    async def create_room(
        self,
        room_name: str,
        empty_timeout: int = 300,  # 5 minutes
        max_participants: int = 10,
        metadata: str = None
    ) -> api.Room:
        """
        Create a new LiveKit room for a debate session.
        
        Args:
            room_name: Unique name for the room
            empty_timeout: Seconds before empty room is deleted
            max_participants: Maximum participants allowed
            metadata: JSON string with debate configuration
            
        Returns:
            Created Room object
        """
        try:
            request = api.CreateRoomRequest(
                name=room_name,
                empty_timeout=empty_timeout,
                max_participants=max_participants
            )
            if metadata:
                request.metadata = metadata
            
            room = await self.livekit_api.room.create_room(request)
            logger.info(f"Created room: {room_name}")
            return room
        except Exception as e:
            logger.error(f"Failed to create room {room_name}: {e}")
            raise
    
    async def list_rooms(self) -> list[api.Room]:
        """List all active rooms."""
        try:
            response = await self.livekit_api.room.list_rooms(
                api.ListRoomsRequest()
            )
            return response.rooms
        except Exception as e:
            logger.error(f"Failed to list rooms: {e}")
            raise
    
    async def get_room(self, room_name: str) -> Optional[api.Room]:
        """Get a specific room by name."""
        try:
            rooms = await self.list_rooms()
            for room in rooms:
                if room.name == room_name:
                    return room
            return None
        except Exception as e:
            logger.error(f"Failed to get room {room_name}: {e}")
            raise
    
    async def delete_room(self, room_name: str) -> bool:
        """
        Delete a LiveKit room.
        
        Args:
            room_name: Name of the room to delete
            
        Returns:
            True if deleted successfully
        """
        try:
            await self.livekit_api.room.delete_room(
                api.DeleteRoomRequest(room=room_name)
            )
            logger.info(f"Deleted room: {room_name}")
            return True
        except Exception as e:
            logger.error(f"Failed to delete room {room_name}: {e}")
            raise
    
    async def list_participants(self, room_name: str) -> list[api.ParticipantInfo]:
        """List all participants in a room."""
        try:
            response = await self.livekit_api.room.list_participants(
                api.ListParticipantsRequest(room=room_name)
            )
            return response.participants
        except Exception as e:
            logger.error(f"Failed to list participants in {room_name}: {e}")
            raise
    
    async def remove_participant(self, room_name: str, identity: str) -> bool:
        """Remove a participant from a room."""
        try:
            await self.livekit_api.room.remove_participant(
                api.RoomParticipantIdentity(room=room_name, identity=identity)
            )
            logger.info(f"Removed participant {identity} from room {room_name}")
            return True
        except Exception as e:
            logger.error(f"Failed to remove participant {identity}: {e}")
            raise
    
    async def close(self):
        """Close the LiveKit API connection."""
        await self.livekit_api.aclose()


# Global service instance
room_service = RoomService()
