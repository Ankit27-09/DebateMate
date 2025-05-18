'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Add TypeScript declarations for web speech API
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    item(index: number): {
      item(index: number): {
        transcript: string;
      };
    };
    length: number;
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognitionInterface {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInterface;
    webkitSpeechRecognition: new () => SpeechRecognitionInterface;
  }
}

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function DebateStartPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to DebateMate! I\'m Professor Logic, your AI debate partner. What topic would you like to debate today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [debateStarted, setDebateStarted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        speechRecognitionRef.current = new SpeechRecognition();
        speechRecognitionRef.current.continuous = true;
        speechRecognitionRef.current.interimResults = true;        speechRecognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let transcript = '';
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results.item(i).item(0).transcript;
          }

          setInputValue(transcript);
        };        speechRecognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error, event.message);
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');

    // If this is the first user message, set it as the topic
    if (!topic) {
      setTopic(inputValue);
      
      // Send AI response confirming the topic
      setTimeout(() => {
        const topicConfirmation: Message = {
          id: (Date.now() + 1).toString(),
          content: `Great! Let's debate about "${inputValue}". I'll take the opposing position. Would you like to make the opening statement?`,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, topicConfirmation]);
        speakText(topicConfirmation.content);
        setDebateStarted(true);
      }, 1000);
      return;
    }    try {
      const response = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userInput: inputValue,
          stance: 'pro', // We always start as pro, AI takes con
          isFirstMessage: !topic // true for first message, false for subsequent ones
        }),
      });

      const data = await response.json();

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      speakText(aiResponse.content);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      // Handle error appropriately
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    if (!speechRecognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isRecording) {
      speechRecognitionRef.current.stop();
    } else {
      speechRecognitionRef.current.start();
    }
    setIsRecording(!isRecording);
  };

  const speakText = (text: string) => {
    if (!speechSynthesisRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
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
      const lastAIMessage = [...messages]
        .reverse()
        .find((m) => m.sender === 'ai');
      if (lastAIMessage) {
        speakText(lastAIMessage.content);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
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
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Professor Logic" />
            <AvatarFallback>PL</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-sm font-medium">Professor Logic</h1>
            <p className="text-xs text-muted-foreground">Logical Reasoning Expert</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {topic && (
            <Badge variant="outline" className="hidden sm:inline-flex">
              Topic: {topic}
            </Badge>
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
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="mt-1 text-right text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
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
              className={isRecording ? 'bg-red-100 text-red-500' : ''}
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
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
              className={isSpeaking ? 'bg-blue-100 text-blue-500' : ''}
              onClick={toggleSpeaking}
            >
              {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}