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
  const [activeModal, setActiveModal] = useState<"persona" | "difficulty" | "voice" | "exit" | null>(null)
  //states for setting persona, difficulty, and voice
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [voiceEnabled, setVoiceEnabled] = useState<boolean | null>(true)
  const [modalType, setModalType] = useState<"share" | "report" | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  console.log(selectedPersona,selectedDifficulty,)

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

  const downloadTranscript = () => {
    const content = messages.map((m) => `[${m.sender.toUpperCase()}]: ${m.content}`).join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic}_transcript.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
              <DropdownMenuItem onClick={() => setActiveModal("persona")} className="hover:cursor-pointer">Change AI Persona</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveModal("difficulty")} className="hover:cursor-pointer">Adjust Difficulty</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveModal("voice")} className="hover:cursor-pointer">Voice Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveModal("exit")} className="hover:cursor-pointer">End Debate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/*Dialog box*/}
          {activeModal && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl z-50">
                <h2 className="text-xl font-bold mb-4">
                  {activeModal === "persona" && "Select AI Persona"}
                  {activeModal === "difficulty" && "Adjust Difficulty"}
                  {activeModal === "voice" && "Voice Settings"}
                  {activeModal === "exit" && "Exit Chat"}
                </h2>

                {/* Persona Selection */}
                {activeModal === "persona" && (
                  <div className="flex flex-col gap-2">
                    {["Friendly", "Formal", "Sarcastic"].map(p => (
                      <button
                        key={p}
                        className={`p-2 rounded ${selectedPersona === p ? "bg-black text-white" : "border"} hover:cursor-pointer`}
                        onClick={() => setSelectedPersona(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}

                {/* Difficulty */}
                {activeModal === "difficulty" && (
                  <div className="flex flex-col gap-2">
                    {["Easy", "Medium", "Hard"].map(level => (
                      <button
                        key={level}
                        className={`p-2 rounded ${selectedDifficulty === level ? "bg-black text-white" : "border"} hover:cursor-pointer`}
                        onClick={() => setSelectedDifficulty(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                )}

                {/* Voice */}
                {activeModal === "voice" && (
                  <div className="flex flex-col gap-2">
                    <button
                      className={`p-2 rounded ${voiceEnabled === true ? "bg-green-600 text-white" : "border"} hover:cursor-pointer`}
                      onClick={() => setVoiceEnabled(true)}
                    >
                      Enable Voice
                    </button>
                    <button
                      className={`p-2 rounded ${voiceEnabled === false ? "bg-red-600 text-white" : "border"} hover:cursor-pointer`}
                      onClick={() => setVoiceEnabled(false)}
                    >
                      Disable Voice
                    </button>
                  </div>
                )}

                {/* Exit */}
                {activeModal === "exit" && (
                  <div className="flex flex-col gap-4">
                    <p>Do you want to save the chat before exiting?</p>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setActiveModal(null)} className="border px-4 py-2 rounded hover:cursor-pointer">Cancel</button>
                      <Link href="/"><button
                        onClick={() => {
                          // Save logic here
                          setActiveModal(null);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                      >
                        Save & Exit
                      </button></Link>
                       <Link href="/"><button
                        onClick={() => {
                          setActiveModal(null);
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                      >
                        Exit Without Saving
                      </button></Link>
                    </div>
                  </div>
                )}

                {/* OK Button */}
                {activeModal !== "exit" && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-3 py-1 bg-gray-800 text-white rounded-md hover:cursor-pointer"
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={downloadTranscript} className="hover:cursor-pointer">
                <Download className="mr-2 h-4 w-4" />
                Save Transcript
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModalType("share")} className="hover:cursor-pointer">Share Debate</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModalType("report")} className="hover:cursor-pointer">Report Issue</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* model menu for more options */}
          {modalType && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" >
              <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl relative ">
                
                {/* Header */}
                <h2 className="text-2xl font-bold mb-5 text-center">
                  {modalType === "share" ? "Share This Debate" : "Report an Issue"}
                </h2>

                {/* Share Content */}
                {modalType === "share" && (
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      readOnly
                      value="https://yourapp.com/debate/123"
                      className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard
                          .writeText("https://yourapp.com/debate/123")
                          .catch(() => alert("Failed to copy link."));
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg hover:cursor-pointer"
                    >
                      Copy Link
                    </button>
                  </div>
                )}
                {/* Report Content */}
                {modalType === "report" && (
                  <div className="flex flex-col gap-4">
                    <textarea
                      rows={4}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 hover:cursor-pointer"
                      placeholder="Describe the issue..."
                    ></textarea>
                    <button
                      onClick={() => {
                        // Submit to backend here
                        setModalType(null);
                      }}
                      className="bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-lg hover:cursor-pointer"
                    >
                      Submit Report
                    </button>
                  </div>
                )}

                {/* Bottom Button (OK/Close) */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setModalType(null)}
                    className="px-6 py-2 border border-gray-300 bg-black text-white rounded-lg hover:bg-gray-700 cursor-pointer transition"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}

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
              className={voiceEnabled && isSpeaking ? "bg-blue-100 text-blue-500" : ""}
              onClick={toggleSpeaking}
            >
              {voiceEnabled && isSpeaking ? (
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
