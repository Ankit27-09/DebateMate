"""
DEBATEMATE - Real-Time Multi-Voice AI Debate Platform
FastAPI Backend Entry Point
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from config import settings, validate_config
from api import rooms, debates

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown lifecycle."""
    # Startup
    logger.info("Starting DEBATEMATE backend...")
    
    # Validate configuration
    config_errors = validate_config()
    if config_errors:
        for error in config_errors:
            logger.warning(f"Configuration warning: {error}")
    
    logger.info("DEBATEMATE backend started successfully")
    
    yield
    
    # Shutdown
    logger.info("Shutting down DEBATEMATE backend...")


# Create FastAPI application
app = FastAPI(
    title="DEBATEMATE API",
    description="Real-time multi-voice AI debate platform backend",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(rooms.router, prefix="/api/rooms", tags=["Rooms"])
app.include_router(debates.router, prefix="/api/debates", tags=["Debates"])


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "DEBATEMATE",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """Detailed health check."""
    config_errors = validate_config()
    return {
        "status": "healthy" if not config_errors else "degraded",
        "config_valid": len(config_errors) == 0,
        "config_errors": config_errors
    }
