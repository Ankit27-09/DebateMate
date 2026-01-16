"""
Turn-Taking Manager
Implements fair turn rotation algorithm for debate participants.
"""
import time
from typing import Optional
from dataclasses import dataclass, field
from enum import Enum


class Role(str, Enum):
    """Debate participant roles."""
    PRO = "PRO"
    CON = "CON"
    MODERATOR = "MODERATOR"


@dataclass
class Participant:
    """Represents a debate participant."""
    id: str
    name: str
    role: Role
    is_user: bool = False
    is_moderator: bool = False
    last_spoke_at: float = 0.0
    speak_count: int = 0
    total_speak_time: float = 0.0


@dataclass
class Turn:
    """Represents a speaking turn."""
    speaker_id: str
    speaker_name: str
    role: Role
    started_at: float
    ended_at: Optional[float] = None
    content: str = ""
    was_interrupted: bool = False


class TurnManager:
    """
    Manages turn-taking in debates with fair rotation.
    
    Algorithm:
    1. Alternates between PRO and CON sides
    2. User gets priority every 3rd turn
    3. Least-recently-spoken gets priority within same role
    4. Supports interruption handling
    """
    
    def __init__(
        self,
        max_turn_duration: int = 45,  # seconds
        user_turn_frequency: int = 3  # user speaks every N turns
    ):
        self.participants: dict[str, Participant] = {}
        self.user_id: Optional[str] = None
        self.moderator_id: Optional[str] = None
        self.current_turn: Optional[Turn] = None
        self.turn_history: list[Turn] = []
        self.turn_count: int = 0
        self.max_turn_duration = max_turn_duration
        self.user_turn_frequency = user_turn_frequency
        self.last_role: Optional[Role] = None
    
    def add_participant(self, participant: Participant) -> None:
        """Add a participant to the debate."""
        self.participants[participant.id] = participant
        
        if participant.is_user:
            self.user_id = participant.id
        if participant.is_moderator:
            self.moderator_id = participant.id
    
    def remove_participant(self, participant_id: str) -> None:
        """Remove a participant from the debate."""
        if participant_id in self.participants:
            del self.participants[participant_id]
    
    def get_next_speaker(self) -> Optional[Participant]:
        """
        Determine the next speaker based on fair rotation algorithm.
        
        Returns:
            Next Participant to speak, or None if no valid speaker
        """
        self.turn_count += 1
        
        # Get debating participants (exclude moderator)
        debaters = [
            p for p in self.participants.values() 
            if not p.is_moderator
        ]
        
        if not debaters:
            return None
        
        # User gets every Nth turn (anxiety reduction feature)
        if self.user_id and self.turn_count % self.user_turn_frequency == 0:
            user = self.participants.get(self.user_id)
            if user:
                return user
        
        # Determine target role (alternate PRO/CON)
        if self.last_role == Role.PRO:
            target_role = Role.CON
        elif self.last_role == Role.CON:
            target_role = Role.PRO
        else:
            # Start with PRO
            target_role = Role.PRO
        
        # Get candidates on the target side
        candidates = [p for p in debaters if p.role == target_role]
        
        # Fallback to other side if no candidates
        if not candidates:
            other_role = Role.CON if target_role == Role.PRO else Role.PRO
            candidates = [p for p in debaters if p.role == other_role]
            target_role = other_role
        
        if not candidates:
            return None
        
        # Sort by least recently spoken
        candidates.sort(key=lambda x: (x.speak_count, x.last_spoke_at))
        
        return candidates[0]
    
    def start_turn(self, speaker_id: str) -> Optional[Turn]:
        """
        Start a new speaking turn.
        
        Args:
            speaker_id: ID of the speaker
            
        Returns:
            The new Turn object, or None if speaker not found
        """
        speaker = self.participants.get(speaker_id)
        if not speaker:
            return None
        
        # End current turn if exists
        if self.current_turn:
            self.end_turn()
        
        # Create new turn
        self.current_turn = Turn(
            speaker_id=speaker_id,
            speaker_name=speaker.name,
            role=speaker.role,
            started_at=time.time()
        )
        
        # Update last role
        if not speaker.is_moderator:
            self.last_role = speaker.role
        
        return self.current_turn
    
    def end_turn(self, content: str = "", interrupted: bool = False) -> Optional[Turn]:
        """
        End the current speaking turn.
        
        Args:
            content: Transcript of what was said
            interrupted: Whether the turn was interrupted
            
        Returns:
            The completed Turn object
        """
        if not self.current_turn:
            return None
        
        turn = self.current_turn
        turn.ended_at = time.time()
        turn.content = content
        turn.was_interrupted = interrupted
        
        # Update speaker stats
        speaker = self.participants.get(turn.speaker_id)
        if speaker:
            speaker.last_spoke_at = time.time()
            speaker.speak_count += 1
            if turn.ended_at:
                speaker.total_speak_time += turn.ended_at - turn.started_at
        
        # Add to history
        self.turn_history.append(turn)
        self.current_turn = None
        
        return turn
    
    def get_turn_duration(self) -> float:
        """Get duration of current turn in seconds."""
        if not self.current_turn:
            return 0.0
        return time.time() - self.current_turn.started_at
    
    def is_turn_overtime(self) -> bool:
        """Check if current turn has exceeded max duration."""
        return self.get_turn_duration() > self.max_turn_duration
    
    def get_debate_history(self, last_n: int = 10) -> list[dict]:
        """
        Get recent debate history for context.
        
        Args:
            last_n: Number of recent turns to include
            
        Returns:
            List of turn summaries
        """
        recent = self.turn_history[-last_n:] if self.turn_history else []
        return [
            {
                "speaker": turn.speaker_name,
                "role": turn.role.value,
                "content": turn.content,
                "duration": (turn.ended_at - turn.started_at) if turn.ended_at else 0
            }
            for turn in recent if turn.content
        ]
    
    def get_stats(self) -> dict:
        """Get debate statistics."""
        total_turns = len(self.turn_history)
        pro_turns = sum(1 for t in self.turn_history if t.role == Role.PRO)
        con_turns = sum(1 for t in self.turn_history if t.role == Role.CON)
        
        return {
            "total_turns": total_turns,
            "pro_turns": pro_turns,
            "con_turns": con_turns,
            "current_speaker": self.current_turn.speaker_name if self.current_turn else None,
            "participants": len(self.participants)
        }
