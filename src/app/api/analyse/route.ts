import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { conversations } = await req.json();

    if (!conversations || conversations.length === 0) {
      return NextResponse.json({
        error: 'No debate conversations provided for analysis',
      }, { status: 400 });
    }

    // ✅ Corrected template literal usage inside `.map()`
    const formattedConversations = conversations.map(msg =>
      `${msg.type === 'user' ? 'User' : 'AI'} (${msg.type === 'user' ? msg.stance : 'counter'}): ${msg.content}`
    ).join('\n\n');

    // ✅ Wrapped prompt in backticks and kept formatting clear
    const prompt = `
As a debate coach AI, analyze this debate conversation:

${formattedConversations}

Provide an in-depth analysis with the following sections:
1. STRENGTHS: What were the strongest arguments or techniques used by the debater?
2. WEAKNESSES: Where could the arguments be improved?
3. PERSUASIVENESS: Rate the persuasiveness from 1-10 and explain why.
4. EVIDENCE QUALITY: Evaluate how well evidence was used in arguments.
5. KEY IMPROVEMENT AREAS: List 2-3 specific suggestions for improving debate skills.
6. OVERALL SCORE: Give a score from 1-100 and a brief explanation.

Format your response as JSON with the following structure:
{
  "strengths": "text analysis",
  "weaknesses": "text analysis",
  "persuasiveness": { "score": number, "explanation": "text" },
  "evidenceQuality": "text analysis",
  "improvementAreas": ["suggestion1", "suggestion2", "suggestion3"],
  "overallScore": { "score": number, "explanation": "text" }
}
    `.trim();

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.4,
      }
    });

    const response = result.response;
    const analysisText = response.text();

    try {
      // ✅ Extract clean JSON block from AI response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : analysisText;
      const analysis = JSON.parse(jsonString);

      return NextResponse.json({ analysis });
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      return NextResponse.json({
        analysis: {
          raw: analysisText,
          error: 'Failed to format response as JSON',
        }
      });
    }

  } catch (err) {
    console.error('[Analysis API Error]', err);
    return NextResponse.json({
      error: 'Failed to generate debate analysis.'
    }, { status: 500 });
  }
}
