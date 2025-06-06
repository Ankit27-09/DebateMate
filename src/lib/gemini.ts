import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("Missing GOOGLE_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export type DebateRole = "user" | "ai";
export type DebateMessage = {
  role: DebateRole;
  content: string;
};

export class DebateError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "DebateError";
  }
}

export class DebateManager {
  private model = genAI.getGenerativeModel({ model: "gemini-pro" });
  private chat = this.model.startChat({
    history: [],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
  });

  constructor(private topic: string) {}

  async initializeDebate(): Promise<string> {
    try {
      const prompt = `You are a debate opponent. The topic is "${this.topic}". 
      Your role is to engage in a constructive debate, challenging the user's arguments 
      while maintaining a respectful and professional tone. Start by asking the user to 
      state their position on the topic.`;

      const result = await this.chat.sendMessage(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      if (error instanceof Error) {
        throw new DebateError(
          `Failed to initialize debate: ${error.message}`,
          "INITIALIZATION_ERROR"
        );
      }
      throw new DebateError("Failed to initialize debate", "UNKNOWN_ERROR");
    }
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      if (error instanceof Error) {
        throw new DebateError(
          `Failed to send message: ${error.message}`,
          "MESSAGE_ERROR"
        );
      }
      throw new DebateError("Failed to send message", "UNKNOWN_ERROR");
    }
  }

  async endDebate(): Promise<string> {
    try {
      const prompt = `The debate is now concluding. Please provide a brief summary of the key points 
      discussed and acknowledge the user's participation.`;

      const result = await this.chat.sendMessage(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      if (error instanceof Error) {
        throw new DebateError(
          `Failed to end debate: ${error.message}`,
          "END_DEBATE_ERROR"
        );
      }
      throw new DebateError("Failed to end debate", "UNKNOWN_ERROR");
    }
  }
} 