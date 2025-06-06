"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { toast } from "sonner";

export type DebateMessage = {
  role: "user" | "ai";
  content: string;
};

export default function AIDebate() {
  const [topic, setTopic] = useState("");
  const [isDebateStarted, setIsDebateStarted] = useState(false);
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startDebate = async () => {
    if (!topic.trim()) return;
    try {
      setIsLoading(true);
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, messages: [], action: "start" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to start debate");
      setIsDebateStarted(true);
      setMessages([{ role: "ai" as const, content: data.response }]);
    } catch (error: any) {
      toast.error(error.message || "Failed to start debate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    try {
      setIsLoading(true);
      const newMessages: DebateMessage[] = [...messages, { role: "user", content: userInput }];
      setMessages(newMessages);
      setUserInput("");
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, messages: newMessages, action: "message" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setMessages([...newMessages, { role: "ai" as const, content: data.response }]);
    } catch (error: any) {
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const endDebate = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, messages, action: "end" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to end debate");
      setMessages((prev) => [...prev, { role: "ai" as const, content: data.response }]);
      setIsDebateStarted(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to end debate properly.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        {!isDebateStarted ? (
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-4">
                AI Debate
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Start AI Debate
              </h1>
              <p className="text-xl text-gray-600">
                Choose a topic and engage in a thought-provoking debate with our AI opponent
              </p>
            </div>

            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI Opponent</h3>
                    <p className="text-sm text-gray-500">Powered by Gemini</p>
                  </div>
                </div>

                <Input
                  placeholder="Enter debate topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-12 text-lg"
                  disabled={isLoading}
                />
                <Button 
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  onClick={startDebate}
                  disabled={!topic.trim() || isLoading}
                >
                  {isLoading ? "Starting Debate..." : "Start Debate"}
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-900">Debating: {topic}</h1>
              <p className="text-gray-600">Engage in a constructive debate with our AI opponent</p>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.role === "user" 
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none" 
                            : "bg-white shadow-md rounded-bl-none"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {message.role === "ai" && (
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                              <Bot className="h-4 w-4 text-indigo-600" />
                            </div>
                          )}
                          <span className="font-semibold text-sm">
                            {message.role === "user" ? "You" : "AI Opponent"}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Textarea
                placeholder="Type your argument..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 min-h-[100px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={isLoading}
              />
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  disabled={!userInput.trim() || isLoading}
                >
                  <Send className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={endDebate}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  End Debate
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 