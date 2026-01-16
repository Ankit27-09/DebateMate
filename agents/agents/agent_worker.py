"""
Agent Worker - Multiple Agent Handoffs with Different Murf Voices
Each character is a separate Agent class with unique voice.
Agents hand off to each other to change voices.
"""
from dotenv import load_dotenv
import logging
import json
import asyncio

from livekit import agents, rtc, api
from livekit.agents import AgentServer, AgentSession, Agent, room_io
from livekit.agents.job import get_job_context
from livekit.agents.llm import function_tool, ChatContext
from livekit.plugins import (
    openai,
    noise_cancellation,
    murf
)

# Load environment
load_dotenv(".env")

# Configure logging  
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Debate context
DEBATE = {
    "topic": "Should AI be regulated?",
    "user_name": "User",
    "turn": 0
}


class BaseAgent(Agent):
    """Base class with auto-start."""
    async def on_enter(self):
        await asyncio.sleep(2)
        self.session.generate_reply()


class MorganModerator(BaseAgent):
    """Morgan - Moderator with Caleb voice."""
    
    def __init__(self, chat_ctx: ChatContext = None) -> None:
        super().__init__(
            instructions=f"""You are Morgan, the debate moderator.
Topic: "{DEBATE['topic']}"

Say: "Welcome! I'm Morgan. Today we're debating: {DEBATE['topic']}. Let's start with Alex from the PRO side."

Then call the switch_to_alex tool.""",
            llm=openai.realtime.RealtimeModel(modalities=["text"]),
            tts=murf.TTS(voice="Caleb", style="Conversation"),
            chat_ctx=chat_ctx
        )

    @function_tool
    async def switch_to_alex(self):
        """Switch to Alex (PRO)."""
        await asyncio.sleep(2)
        return AlexPro(chat_ctx=self.chat_ctx), "Switching to Alex."

    @function_tool  
    async def switch_to_maya(self):
        """Switch to Maya (CON)."""
        await asyncio.sleep(2)
        return MayaCon(chat_ctx=self.chat_ctx), "Switching to Maya."

    @function_tool
    async def switch_to_jordan(self):
        """Switch to Jordan (PRO)."""
        await asyncio.sleep(2)
        return JordanPro(chat_ctx=self.chat_ctx), "Switching to Jordan."

    @function_tool
    async def switch_to_riley(self):
        """Switch to Riley (CON)."""
        await asyncio.sleep(2)
        return RileyCon(chat_ctx=self.chat_ctx), "Switching to Riley."

    @function_tool
    async def end_debate(self):
        """End the debate."""
        self.session.interrupt()
        await self.session.generate_reply(
            instructions="Thank everyone and say goodbye.",
            allow_interruptions=False
        )
        job_ctx = get_job_context()
        await job_ctx.api.room.delete_room(api.DeleteRoomRequest(room=job_ctx.room.name))


class AlexPro(BaseAgent):
    """Alex - PRO with Matthew voice (Male)."""
    
    def __init__(self, chat_ctx: ChatContext = None) -> None:
        super().__init__(
            instructions=f"""You are Alex, arguing FOR: "{DEBATE['topic']}"

Make ONE strong PRO argument in 2-3 sentences.
Then say "Back to Morgan" and call back_to_morgan.""",
            llm=openai.realtime.RealtimeModel(modalities=["text"]),
            tts=murf.TTS(voice="Matthew", style="Conversation"),
            chat_ctx=chat_ctx
        )

    @function_tool
    async def back_to_morgan(self):
        """Return to moderator."""
        await asyncio.sleep(2)
        return MorganAfterAlex(chat_ctx=self.chat_ctx), "Back to Morgan."


class MorganAfterAlex(BaseAgent):
    """Morgan after Alex - calls Maya next."""
    
    def __init__(self, chat_ctx: ChatContext = None) -> None:
        super().__init__(
            instructions="""You are Morgan. 
Say: "Thank you Alex. Now Maya, your opposing view?"
Then call switch_to_maya.""",
            llm=openai.realtime.RealtimeModel(modalities=["text"]),
            tts=murf.TTS(voice="Caleb", style="Conversation"),
            chat_ctx=chat_ctx
        )

    @function_tool
    async def switch_to_maya(self):
        """Switch to Maya."""
        await asyncio.sleep(2)
        return MayaCon(chat_ctx=self.chat_ctx), "Switching to Maya."


class MayaCon(BaseAgent):
    """Maya - CON with Alicia voice (Female)."""
    
    def __init__(self, chat_ctx: ChatContext = None) -> None:
        super().__init__(
            instructions=f"""You are Maya, arguing AGAINST: "{DEBATE['topic']}"

Make ONE strong CON argument in 2-3 sentences.
Then say "Morgan, back to you" and call back_to_morgan.""",
            llm=openai.realtime.RealtimeModel(modalities=["text"]),
            tts=murf.TTS(voice="Alicia", style="Conversation"),
            chat_ctx=chat_ctx
        )

    @function_tool
    async def back_to_morgan(self):
        """Return to moderator."""
        await asyncio.sleep(2)
        return MorganAfterMaya(chat_ctx=self.chat_ctx), "Back to Morgan."


class MorganAfterMaya(BaseAgent):
    """Morgan after Maya - calls Jordan next."""
    
    def __init__(self, chat_ctx: ChatContext = None) -> None:
        super().__init__(
            instructions="""You are Morgan.
Say: "Good points Maya. Jordan, what would you add?"
Then call switch_to_jordan.""",
            llm=openai.realtime.RealtimeModel(modalities=["text"]),
            tts=murf.TTS(voice="Caleb", style="Conversation"),
            chat_ctx=chat_ctx
        )

    @function_tool  
    async def switch_to_jordan(self):
        """Switch to Jordan."""
        await asyncio.sleep(2)
        return JordanPro(chat_ctx=self.chat_ctx), "Switching to Jordan."


class JordanPro(BaseAgent):
    """Jordan - PRO with Zion voice (Male)."""
    
    def __init__(self, chat_ctx: ChatContext = None) -> None:
        super().__init__(
            instructions=f"""You are Jordan, arguing FOR: "{DEBATE['topic']}"

Add to the PRO argument in 2-3 sentences.
Then say "Back to Morgan" and call back_to_morgan.""",
            llm=openai.realtime.RealtimeModel(modalities=["text"]),
            tts=murf.TTS(voice="Zion", style="Conversation"),
            chat_ctx=chat_ctx
        )

    @function_tool
    async def back_to_morgan(self):
        """Return to moderator."""
        await asyncio.sleep(2)
        return MorganAfterJordan(chat_ctx=self.chat_ctx), "Back to Morgan."


class MorganAfterJordan(BaseAgent):
    """Morgan after Jordan - calls Riley next."""
    
    def __init__(self, chat_ctx: ChatContext = None) -> None:
        super().__init__(
            instructions="""You are Morgan.
Say: "Thank you Jordan. Riley, your response?"
Then call switch_to_riley.""",
            llm=openai.realtime.RealtimeModel(modalities=["text"]),
            tts=murf.TTS(voice="Caleb", style="Conversation"),
            chat_ctx=chat_ctx
        )

    @function_tool
    async def switch_to_riley(self):
        """Switch to Riley."""
        await asyncio.sleep(2)
        return RileyCon(chat_ctx=self.chat_ctx), "Switching to Riley."


class RileyCon(BaseAgent):
    """Riley - CON with Amara voice (Female)."""
    
    def __init__(self, chat_ctx: ChatContext = None) -> None:
        super().__init__(
            instructions=f"""You are Riley, arguing AGAINST: "{DEBATE['topic']}"

Add to the CON argument in 2-3 sentences.
Then say "Morgan, back to you" and call back_to_morgan.""",
            llm=openai.realtime.RealtimeModel(modalities=["text"]),
            tts=murf.TTS(voice="Amara", style="Conversation"),
            chat_ctx=chat_ctx
        )

    @function_tool
    async def back_to_morgan(self):
        """Return to moderator."""
        await asyncio.sleep(2)
        return MorganInviteUser(chat_ctx=self.chat_ctx), "Back to Morgan."


class MorganInviteUser(BaseAgent):
    """Morgan invites user to speak."""
    
    def __init__(self, chat_ctx: ChatContext = None) -> None:
        user = DEBATE.get("user_name", "User")
        super().__init__(
            instructions=f"""You are Morgan.
Say: "Now {user}, we'd love to hear your thoughts. What do you think about this topic?"
Then STOP and LISTEN for {user} to speak.
When they speak, acknowledge them and call continue_debate.""",
            llm=openai.realtime.RealtimeModel(modalities=["text"]),
            tts=murf.TTS(voice="Caleb", style="Conversation"),
            chat_ctx=chat_ctx
        )

    @function_tool
    async def continue_debate(self):
        """Continue the debate after user speaks."""
        await asyncio.sleep(2)
        return MorganContinue(chat_ctx=self.chat_ctx), "Continuing debate."

    @function_tool
    async def end_debate(self):
        """End debate if user requests."""
        self.session.interrupt()
        await self.session.generate_reply(
            instructions="Thank everyone warmly.",
            allow_interruptions=False
        )
        job_ctx = get_job_context()
        await job_ctx.api.room.delete_room(api.DeleteRoomRequest(room=job_ctx.room.name))


class MorganContinue(BaseAgent):
    """Morgan continues after user input."""
    
    def __init__(self, chat_ctx: ChatContext = None) -> None:
        super().__init__(
            instructions="""You are Morgan.
Acknowledge what the user said briefly, then call on Alex to respond.
Then call switch_to_alex.""",
            llm=openai.realtime.RealtimeModel(modalities=["text"]),
            tts=murf.TTS(voice="Caleb", style="Conversation"),
            chat_ctx=chat_ctx
        )

    @function_tool
    async def switch_to_alex(self):
        await asyncio.sleep(2)
        return AlexRespond(chat_ctx=self.chat_ctx), "To Alex."

    @function_tool
    async def end_debate(self):
        self.session.interrupt()
        job_ctx = get_job_context()
        await job_ctx.api.room.delete_room(api.DeleteRoomRequest(room=job_ctx.room.name))


class AlexRespond(BaseAgent):
    """Alex responds to user."""
    
    def __init__(self, chat_ctx: ChatContext = None) -> None:
        super().__init__(
            instructions="""You are Alex (PRO). 
Respond to what the user just said with a brief PRO perspective (2 sentences).
Then call back_to_morgan.""",
            llm=openai.realtime.RealtimeModel(modalities=["text"]),
            tts=murf.TTS(voice="Matthew", style="Conversation"),
            chat_ctx=chat_ctx
        )

    @function_tool
    async def back_to_morgan(self):
        await asyncio.sleep(2)
        return MorganInviteUser(chat_ctx=self.chat_ctx), "Back."


# Server
server = AgentServer()


@server.rtc_session()
async def debate_session(ctx: agents.JobContext):
    logger.info(f"Room: {ctx.room.name}")
    
    try:
        if ctx.room.metadata:
            config = json.loads(ctx.room.metadata)
            DEBATE["topic"] = config.get("topic", DEBATE["topic"])
            for p in ctx.room.remote_participants.values():
                if not p.identity.startswith("agent"):
                    DEBATE["user_name"] = p.name or "User"
                    break
    except:
        pass
    
    logger.info(f"Topic: {DEBATE['topic']}")
    
    session = AgentSession()
    await session.start(
        room=ctx.room,
        agent=MorganModerator(),
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=lambda p: noise_cancellation.BVC(),
            ),
        ),
    )


if __name__ == "__main__":
    agents.cli.run_app(server)
