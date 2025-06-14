import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { topic, messages, action } = await req.json();
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    
    let prompt = "";
    if (action === "start") {
      prompt = `You are a debate opponent. The topic is "${topic}". Your role is to engage in a constructive debate, challenging the user's arguments while maintaining a respectful and professional tone. Start by asking the user to state their position on the topic.`;
    } else if (action === "message") {
      prompt = messages[messages.length - 1].content;
    } else if (action === "end") {
      prompt = `The debate is now concluding. Please provide a brief summary of the key points discussed and acknowledge the user's participation.`;
    }

    console.log("Sending request to:", API_URL);
    console.log("With prompt:", prompt);

    const response = await fetch(`${API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const responseText = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error("Gemini API error details:", {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      errorDetails: error.errorDetails,
      stack: error.stack
    });
    return NextResponse.json({ 
      error: error.message || "Unknown error",
      details: error.errorDetails || "No additional details available"
    }, { status: 500 });
  }
} 