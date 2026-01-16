"""
Configuration module for DEBATEMATE backend.
Loads environment variables and provides centralized configuration.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from typing import Optional

# Load environment variables (check multiple locations)
env_path = Path(__file__).parent / ".env"
if not env_path.exists():
    env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(env_path)


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # LiveKit Configuration
    LIVEKIT_URL: str = os.getenv("LIVEKIT_URL", "")
    LIVEKIT_API_KEY: str = os.getenv("LIVEKIT_API_KEY", "")
    LIVEKIT_API_SECRET: str = os.getenv("LIVEKIT_API_SECRET", "")
    
    # OpenAI Configuration
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Deepgram Configuration (for STT)
    DEEPGRAM_API_KEY: str = os.getenv("DEEPGRAM_API_KEY", "")
    
    # Application Settings
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    # Debate Settings
    DEFAULT_TURN_DURATION: int = 45  # seconds
    MAX_AGENTS: int = 6
    MIN_AGENTS: int = 2
    
    class Config:
        env_file = ".env.local"
        extra = "ignore"


# Global settings instance
settings = Settings()


def validate_config() -> list[str]:
    """Validate that required configuration is present."""
    errors = []
    
    if not settings.LIVEKIT_URL:
        errors.append("LIVEKIT_URL is required")
    if not settings.LIVEKIT_API_KEY:
        errors.append("LIVEKIT_API_KEY is required")
    if not settings.LIVEKIT_API_SECRET:
        errors.append("LIVEKIT_API_SECRET is required")
    if not settings.OPENAI_API_KEY:
        errors.append("OPENAI_API_KEY is required")
        
    return errors
