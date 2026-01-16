"""
Debate State Manager
Manages the complete state of a debate session.
"""
import uuid
import time
from typing import Optional
from dataclasses import dataclass, field
from enum import Enum

from .turn_manager import TurnManager, Participant, Role, Turn


class DebateStatus(str, Enum):
    """Debate session status."""
    CONFIGURING = "configuring"
    WAITING = "waiting"  # Waiting for participants
    STARTING = "starting"
    ACTIVE = "active"
    PAUSED = "paused"
    ENDING = "ending"
    COMPLETED = "completed"


class Personality(str, Enum):
    """AI agent personality types."""
    LOGICAL = "logical"
    EMOTIONAL = "emotional"
    AGGRESSIVE = "aggressive"
    CALM = "calm"
    SUPPORTIVE = "supportive"


@dataclass
class AgentConfig:
    """Configuration for an AI agent."""
    agent_id: str
    name: str
    role: Role
    personality: Personality
    voice: str = "alloy"  # OpenAI TTS voice
    
    def to_dict(self) -> dict:
        return {
            "agent_id": self.agent_id,
            "name": self.name,
            "role": self.role.value,
            "personality": self.personality.value,
            "voice": self.voice
        }


@dataclass
class DebateConfig:
    """Configuration for a debate session."""
    topic: str
    num_agents: int = 4
    user_role: Optional[Role] = None  # None if user is observer
    agents: list[AgentConfig] = field(default_factory=list)
    difficulty: str = "beginner"  # beginner, intermediate, advanced
    turn_duration: int = 45
    enable_breaks: bool = True


@dataclass
class DebateSession:
    """Complete state of a debate session."""
    debate_id: str
    room_name: str
    config: DebateConfig
    status: DebateStatus
    turn_manager: TurnManager
    created_at: float
    started_at: Optional[float] = None
    ended_at: Optional[float] = None
    summary: str = ""
    
    def to_dict(self) -> dict:
        return {
            "debate_id": self.debate_id,
            "room_name": self.room_name,
            "topic": self.config.topic,
            "status": self.status.value,
            "agents": [a.to_dict() for a in self.config.agents],
            "user_role": self.config.user_role.value if self.config.user_role else None,
            "stats": self.turn_manager.get_stats(),
            "created_at": self.created_at,
            "started_at": self.started_at
        }


class DebateStateManager:
    """
    Manages all active debate sessions.
    In production, this would be backed by Redis.
    """
    
    # Agent name pools
    PRO_NAMES = ["Alex", "Jordan", "Morgan", "Taylor", "Casey"]
    CON_NAMES = ["Sam", "Riley", "Quinn", "Jamie", "Drew"]
    VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"]
    
    def __init__(self):
        self.sessions: dict[str, DebateSession] = {}
    
    def create_session(
        self,
        topic: str,
        num_agents: int = 4,
        user_role: Optional[str] = None,
        difficulty: str = "beginner",
        turn_duration: int = 45
    ) -> DebateSession:
        """
        Create a new debate session.
        
        Args:
            topic: Debate topic
            num_agents: Total number of AI agents (2-6)
            user_role: User's role (PRO, CON, or None for observer)
            difficulty: Difficulty level
            turn_duration: Max speaking time per turn
            
        Returns:
            New DebateSession
        """
        debate_id = str(uuid.uuid4())[:8]
        room_name = f"debate_{debate_id}"
        
        # Parse user role
        parsed_role = None
        if user_role:
            parsed_role = Role(user_role.upper())
        
        # Generate agent configurations
        agents = self._generate_agents(num_agents, parsed_role)
        
        # Create config
        config = DebateConfig(
            topic=topic,
            num_agents=num_agents,
            user_role=parsed_role,
            agents=agents,
            difficulty=difficulty,
            turn_duration=turn_duration
        )
        
        # Create turn manager
        turn_manager = TurnManager(
            max_turn_duration=turn_duration,
            user_turn_frequency=3 if difficulty == "beginner" else 4
        )
        
        # Create session
        session = DebateSession(
            debate_id=debate_id,
            room_name=room_name,
            config=config,
            status=DebateStatus.CONFIGURING,
            turn_manager=turn_manager,
            created_at=time.time()
        )
        
        self.sessions[debate_id] = session
        return session
    
    def _generate_agents(
        self,
        num_agents: int,
        user_role: Optional[Role]
    ) -> list[AgentConfig]:
        """Generate balanced agent configurations."""
        agents = []
        
        # Calculate PRO/CON split
        if user_role == Role.PRO:
            num_pro = (num_agents - 1) // 2
            num_con = num_agents - num_pro
        elif user_role == Role.CON:
            num_con = (num_agents - 1) // 2
            num_pro = num_agents - num_con
        else:
            num_pro = num_agents // 2
            num_con = num_agents - num_pro
        
        # Generate PRO agents
        personalities = list(Personality)
        for i in range(num_pro):
            agents.append(AgentConfig(
                agent_id=f"pro_{i+1}",
                name=self.PRO_NAMES[i % len(self.PRO_NAMES)],
                role=Role.PRO,
                personality=personalities[i % len(personalities)],
                voice=self.VOICES[i % len(self.VOICES)]
            ))
        
        # Generate CON agents
        for i in range(num_con):
            agents.append(AgentConfig(
                agent_id=f"con_{i+1}",
                name=self.CON_NAMES[i % len(self.CON_NAMES)],
                role=Role.CON,
                personality=personalities[(i + 2) % len(personalities)],
                voice=self.VOICES[(i + 3) % len(self.VOICES)]
            ))
        
        return agents
    
    def get_session(self, debate_id: str) -> Optional[DebateSession]:
        """Get a debate session by ID."""
        return self.sessions.get(debate_id)
    
    def get_session_by_room(self, room_name: str) -> Optional[DebateSession]:
        """Get a debate session by room name."""
        for session in self.sessions.values():
            if session.room_name == room_name:
                return session
        return None
    
    def update_status(self, debate_id: str, status: DebateStatus) -> bool:
        """Update debate session status."""
        session = self.sessions.get(debate_id)
        if not session:
            return False
        
        session.status = status
        
        if status == DebateStatus.ACTIVE and not session.started_at:
            session.started_at = time.time()
        elif status == DebateStatus.COMPLETED:
            session.ended_at = time.time()
        
        return True
    
    def add_turn(
        self,
        debate_id: str,
        speaker_id: str,
        content: str
    ) -> Optional[Turn]:
        """Record a completed turn in the debate."""
        session = self.sessions.get(debate_id)
        if not session:
            return None
        
        turn = session.turn_manager.start_turn(speaker_id)
        if turn:
            session.turn_manager.end_turn(content=content)
        return turn
    
    def get_debate_history(self, debate_id: str, last_n: int = 10) -> list[dict]:
        """Get recent debate history for context."""
        session = self.sessions.get(debate_id)
        if not session:
            return []
        return session.turn_manager.get_debate_history(last_n)
    
    def delete_session(self, debate_id: str) -> bool:
        """Delete a debate session."""
        if debate_id in self.sessions:
            del self.sessions[debate_id]
            return True
        return False
    
    def get_all_sessions(self) -> list[dict]:
        """Get all active sessions."""
        return [s.to_dict() for s in self.sessions.values()]


# Global state manager instance
debate_state_manager = DebateStateManager()
