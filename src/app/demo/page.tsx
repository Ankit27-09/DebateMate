"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  ArrowLeft,
  MoreVertical,
  Download,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

export default function NewDebatePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Welcome to DebateMate! I'm Professor Logic, your AI debate partner. What topic would you like to debate today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [debateStarted, setDebateStarted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynthesisRef.current = window.speechSynthesis;

      // Check if SpeechRecognition is available

      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        speechRecognitionRef.current = new SpeechRecognition();
        speechRecognitionRef.current.continuous = true;
        speechRecognitionRef.current.interimResults = true;

        speechRecognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join("");

          setInputValue(transcript);
        };

        speechRecognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsRecording(false);
        };
      }
    }

    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    // If this is the first user message, set it as the topic
    if (!topic) {
      setTopic(inputValue);

      // Simulate AI response after a short delay
      setTimeout(() => {
        const topicConfirmation: Message = {
          id: (Date.now() + 1).toString(),
          content: `Great! Let's debate about "${inputValue}". I'll take the opposing position. Would you like to make the opening statement?`,
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, topicConfirmation]);
        speakText(topicConfirmation.content);
        setDebateStarted(true);
      }, 1000);

      return;
    }

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, debateStarted);
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newAIMessage]);
      speakText(newAIMessage.content);
    }, 1500);
  };

  const handleEndDebate = () => {
    // Implement logic to end the debate here
    console.log("End Debate clicked"); // Placeholder
    // Reset state variables
    setMessages([ // Reset messages to the initial welcome message
      {
        id: "1",
        content:
          "Welcome to DebateMate! I'm Professor Logic, your AI debate partner. What topic would you like to debate today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    setTopic(null); // Clear the topic
    setDebateStarted(false); // Reset debate started flag
    setInputValue(""); // Clear the input value
    // You might also want to stop any ongoing speech synthesis or recognition here
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    if (!speechRecognitionRef.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isRecording) {
      speechRecognitionRef.current.stop();
    } else {
      setInputValue("");
      speechRecognitionRef.current.start();
    }

    setIsRecording(!isRecording);
  };

  const speakText = (text: string) => {
    if (!speechSynthesisRef.current) {
      alert("Speech synthesis is not supported in your browser.");
      return;
    }

    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Find a good voice
    const voices = speechSynthesisRef.current.getVoices();
    const preferredVoice =
      voices.find(
        (voice) => voice.name.includes("Google") && voice.name.includes("Male")
      ) || voices.find((voice) => !voice.name.includes("Female"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesisRef.current.speak(utterance);
  };

  const toggleSpeaking = () => {
    if (!speechSynthesisRef.current) return;

    if (isSpeaking) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    } else {
      // Find the last AI message and speak it
      const lastAIMessage = [...messages]
        .reverse()
        .find((m) => m.sender === "ai");
      if (lastAIMessage) {
        speakText(lastAIMessage.content);
      }
    }
  };

  const handleSaveTranscript = () => {
    // Implement logic to save the transcript here
    const transcriptContent = messages
      .map((message) => {
        const sender = message.sender === "user" ? "You" : "Professor Logic (AI)";
        const timestamp = message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return `${sender} [${timestamp}]: ${message.content}`;
      })
      .join("\n");

    const blob = new Blob([transcriptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "debate_transcript.txt";
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  // Simple AI response generator
  const generateAIResponse = (
    userMessage: string,
    debateStarted: boolean
  ): string => {
    if (!debateStarted) {
      return "Let's start the debate. What topic would you like to discuss?";
    }

    // Very basic response generation - in a real app, this would be connected to an AI service
    const responses = [
      "That's an interesting point, but I have to disagree. When we consider the evidence, we find that the opposite is often true. Studies have shown that...",
      "While I understand your perspective, there are several factors you might not be considering. First, the economic impact would be significant because...",
      "I appreciate your argument, but let me offer a counterpoint. If we look at historical precedents, we can see that similar approaches have led to...",
      "That's a common misconception. The data actually suggests that the reality is more nuanced. When we examine the statistics from...",
      "Your argument has merit, but it overlooks a critical aspect of this issue. We need to also consider the social implications, particularly how...",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="h-full flex flex-col w-full">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border bg-accent px-4 sm:px-6 rounded-md">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Professor Logic"
            />
            <AvatarFallback>PL</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-sm font-medium">Professor Logic</h1>
            <p className="text-xs text-muted-foreground">
              Logical Reasoning Expert
            </p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {topic && (
            <Badge variant="outline" className="hidden sm:inline-flex">
              Topic: {topic}
            </Badge>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Change AI Persona</DropdownMenuItem>
              <DropdownMenuItem>Adjust Difficulty</DropdownMenuItem>
              <DropdownMenuItem>Voice Settings</DropdownMenuItem>
              <DropdownMenuItem onSelect={handleEndDebate}>
                End Debate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Save Transcript
              </DropdownMenuItem>
              <DropdownMenuItem>Share Debate</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => console.log("Report Issue clicked")}> {/* Added console log for demonstration */}
 Report Issue
 </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="mt-1 text-right text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border rounded-md bg-accent p-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2">
            <Button
              variant="outline"
              size="icon"
              className={isRecording ? "bg-red-100 text-red-500" : ""}
              onClick={toggleRecording}
            >
              {isRecording ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <div className="relative flex-1">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-10"
              />
              {isRecording && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-pulse">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              className={isSpeaking ? "bg-blue-100 text-blue-500" : ""}
              onClick={toggleSpeaking}
            >
              {isSpeaking ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Button onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
          {/* <div className="mt-2 text-center text-xs text-muted-foreground">
            <p>
              {isRecording
                ? "Listening... Click the microphone icon again to stop."
                : "Click the microphone icon to use voice input."}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
