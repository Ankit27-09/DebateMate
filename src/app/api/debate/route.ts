import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: Request) {
  try {
    const { userInput, stance, isFirstMessage } = await req.json();

    let prompt;
    if (isFirstMessage) {
      prompt = `You are Professor Logic, an AI debate partner.
The user wants to debate about: "${userInput}"

Provide a response that:
1. Acknowledges their chosen topic
2. Takes the opposing position
3. Asks them to make the opening statement

Keep your response concise and engaging.`;
    } else {
      prompt = `You are Professor Logic, an AI debate partner engaged in a debate.

The user has argued: "${userInput}"
${stance ? `They are taking a "${stance}" stance.` : ''}

Provide a ${stance === "pro" ? "counter (con)" : "supportive (pro)"} argument that:
1. Is concise but impactful (3-4 sentences)
2. Includes at least one piece of evidence or reasoning
3. Is persuasive and logically sound
4. Ends with a thought-provoking question

Keep your response under 100 words for quick, engaging debate practice.`;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
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
