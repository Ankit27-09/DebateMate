"""
LiveKit Token Generation Service
Generates access tokens for participants joining debate rooms.
"""
from datetime import timedelta
from livekit import api
from config import settings


class TokenService:
    """Service for generating LiveKit access tokens."""
    
    def __init__(self):
        self.api_key = settings.LIVEKIT_API_KEY
        self.api_secret = settings.LIVEKIT_API_SECRET
    
    def generate_token(
        self,
        room_name: str,
        participant_identity: str,
        participant_name: str,
        is_agent: bool = False,
        ttl: int = 3600  # 1 hour default in seconds
    ) -> str:
        """
        Generate a LiveKit access token for a participant.
        
        Args:
            room_name: Name of the LiveKit room
            participant_identity: Unique identifier for the participant
            participant_name: Display name for the participant
            is_agent: Whether this is an AI agent (grants additional permissions)
            ttl: Token time-to-live in seconds
            
        Returns:
            JWT access token string
        """
        token = api.AccessToken(self.api_key, self.api_secret) \
            .with_identity(participant_identity) \
            .with_name(participant_name) \
            .with_ttl(timedelta(seconds=ttl)) \
            .with_grants(api.VideoGrants(
                room_join=True,
                room=room_name,
                can_publish=True,
                can_subscribe=True,
                can_publish_data=True,
                room_admin=is_agent,
                room_record=is_agent
            ))
        
        return token.to_jwt()
    
    def generate_user_token(
        self,
        room_name: str,
        user_id: str,
        user_name: str
    ) -> str:
        """Generate token for a human user participant."""
        return self.generate_token(
            room_name=room_name,
            participant_identity=f"user_{user_id}",
            participant_name=user_name,
            is_agent=False
        )
    
    def generate_agent_token(
        self,
        room_name: str,
        agent_id: str,
        agent_name: str,
        role: str
    ) -> str:
        """Generate token for an AI agent participant."""
        return self.generate_token(
            room_name=room_name,
            participant_identity=f"agent_{agent_id}",
            participant_name=f"{agent_name} ({role})",
            is_agent=True,
            ttl=7200  # 2 hours for agents
        )


# Global service instance
token_service = TokenService()
