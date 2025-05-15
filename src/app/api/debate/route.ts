import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { userInput, stance } = await req.json();

    // Enhanced prompt that asks for a more detailed and structured response
    const prompt = `You are an AI debate coach helping users practice their debate skills.

The user has presented this argument with a "${stance}" stance: "${userInput}".

Provide a strong ${stance === "pro" ? "counter (con)" : "supportive (pro)"} argument.

Your response should:
1. Be concise but impactful (3-4 sentences)
2. Include at least one piece of evidence or reasoning
3. Be persuasive and logically sound
4. End with a challenging question that makes the user think about their stance

Keep your overall response under 100 words for quick, impactful debate practice.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      }
    });

    const response = result.response;
    const aiResponse = response.text();

    return NextResponse.json({ aiResponse });
  } catch (err) {
    console.error('[Gemini API Error]', err);
    return NextResponse.json({ error: 'Failed to generate debate content.' }, { status: 500 });
  }
}