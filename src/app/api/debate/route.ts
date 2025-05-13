import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { userInput, stance } = await req.json();

    const prompt = `You are an AI debater. The user says: "${userInput}".
Respond with a ${stance === "pro" ? "counter (con)" : "supportive (pro)"} argument.
Keep it short (2–3 sentences), firm, and clear.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }]
    });

    const response = result.response;
    const aiResponse = response.text();

    return NextResponse.json({ aiResponse });
  } catch (err) {
    console.error('[Gemini API Error]', err);
    return NextResponse.json({ error: 'Failed to generate debate content.' }, { status: 500 });
  }
}
