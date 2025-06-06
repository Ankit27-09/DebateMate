"use client";

import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Clock,
  Download,
  Flag,
  Lightbulb,
  Mic,
  MicOff,
  MoreVertical,
  Pause,
  Play,
  RotateCcw,
  Send,
  Settings,
  Target,
  TrendingUp,
  Trophy,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  round?: number;
  scores?: {
    logic: number;
    evidence: number;
    rhetoric: number;
  };
};

type DebateState = "topic-selection" | "debate-active" | "debate-ended";

type DebateScores = {
  user: { logic: number; evidence: number; rhetoric: number; total: number };
  ai: { logic: number; evidence: number; rhetoric: number; total: number };
};

const predefinedTopics = [
  {
    id: 1,
    title: "Artificial Intelligence should be regulated by governments",
    category: "Technology",
  },
  {
    id: 2,
    title: "Social media has more negative than positive effects on society",
    category: "Social Issues",
  },
  {
    id: 3,
    title:
      "Climate change requires immediate drastic action over gradual change",
    category: "Environment",
  },
  {
    id: 4,
    title: "Universal Basic Income should be implemented globally",
    category: "Economics",
  },
  {
    id: 5,
    title:
      "Space exploration funding should be prioritized over poverty reduction",
    category: "Policy",
  },
  {
    id: 6,
    title: "Genetic engineering of humans should be allowed",
    category: "Ethics",
  },
  {
    id: 7,
    title: "Remote work is better than office work for productivity",
    category: "Work Culture",
  },
  {
    id: 8,
    title: "Cryptocurrency will replace traditional currency",
    category: "Finance",
  },
];

export default function NewDebatePage() {
  // Existing state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [debateStarted, setDebateStarted] = useState(false);

  // New enhanced state
  const [debateState, setDebateState] =
    useState<DebateState>("topic-selection");
  const [currentRound, setCurrentRound] = useState(1);
  const [maxRounds] = useState(3);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes per round
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [scores, setScores] = useState<DebateScores>({
    user: { logic: 0, evidence: 0, rhetoric: 0, total: 0 },
    ai: { logic: 0, evidence: 0, rhetoric: 0, total: 0 },
  });
  const [isTyping, setIsTyping] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      handleRoundEnd();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynthesisRef.current = window.speechSynthesis;

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

  const formatTimeLeft = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startDebate = (
    selectedTopic: string,
    userPosition: "for" | "against",
    customTopic: string
  ) => {
    const finalTopic = selectedTopic || customTopic;
    if (!finalTopic || !userPosition) return;

    setTopic(finalTopic);
    setDebateState("debate-active");
    setDebateStarted(true);
    setIsTimerActive(true);
    setCurrentRound(1);

    // Initial AI message
    const aiOpeningPrompt = `You are an AI debate opponent. The debate topic is: "${finalTopic}". The human is arguing ${
      userPosition === "for" ? "FOR" : "AGAINST"
    } this position, so you must argue ${
      userPosition === "for" ? "AGAINST" : "FOR"
    } it. 

This is Round 1 of the debate. Provide a strong opening argument (2-3 sentences) that establishes your position clearly. Be respectful but firm in your stance. Focus on one key point to start the debate.

Respond only with your opening argument, nothing else.`;

    const initialMessage: Message = {
      id: "initial",
      content: `Great! Let's debate "${finalTopic}". I'll argue ${
        userPosition === "for" ? "AGAINST" : "FOR"
      } this position while you argue ${
        userPosition === "for" ? "FOR" : "AGAINST"
      } it. This is Round 1 - you have 3 minutes. Let me start with my opening statement: 

${generateAIResponse(aiOpeningPrompt, true)}`,
      sender: "ai",
      timestamp: new Date(),
      round: 1,
    };

    setMessages([initialMessage]);
    speakText(initialMessage.content);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      round: currentRound,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    // Update user scores
    updatePlayerScores("user", inputValue);

    // Generate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, debateStarted);
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        round: currentRound,
      };
      setMessages((prev) => [...prev, newAIMessage]);
      updatePlayerScores("ai", aiResponse);
      speakText(newAIMessage.content);
      setIsTyping(false);
    }, 1500);
  };

  const updatePlayerScores = (player: "user" | "ai", message: string) => {
    // Simple scoring algorithm - in production, this would use AI analysis
    const logicScore = Math.floor(Math.random() * 15) + 10;
    const evidenceScore = Math.floor(Math.random() * 15) + 8;
    const rhetoricScore = Math.floor(Math.random() * 15) + 12;
    const roundTotal = logicScore + evidenceScore + rhetoricScore;

    setScores((prev) => ({
      ...prev,
      [player]: {
        logic: prev[player].logic + logicScore,
        evidence: prev[player].evidence + evidenceScore,
        rhetoric: prev[player].rhetoric + rhetoricScore,
        total: prev[player].total + roundTotal,
      },
    }));
  };

  const handleRoundEnd = () => {
    setIsTimerActive(false);

    if (currentRound < maxRounds) {
      setCurrentRound((prev) => prev + 1);
      setTimeLeft(180);

      // Add round transition message
      const transitionMessage: Message = {
        id: `round-${currentRound + 1}`,
        content: `Round ${currentRound} has ended! Moving to Round ${
          currentRound + 1
        }. The timer has been reset.`,
        sender: "ai",
        timestamp: new Date(),
        round: currentRound + 1,
      };

      setMessages((prev) => [...prev, transitionMessage]);
      setIsTimerActive(true);
    } else {
      endDebate();
    }
  };

  const endDebate = () => {
    setIsTimerActive(false);
    setDebateState("debate-ended");

    const endMessage: Message = {
      id: "debate-end",
      content:
        "The debate has concluded! Thank you for the engaging discussion. Check your final scores and feedback.",
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, endMessage]);
  };

  const resetDebate = () => {
    setDebateState("topic-selection");
    setMessages([]);
    setTopic(null);
    setCurrentRound(1);
    setTimeLeft(180);
    setIsTimerActive(false);
    setDebateStarted(false);
    setScores({
      user: { logic: 0, evidence: 0, rhetoric: 0, total: 0 },
      ai: { logic: 0, evidence: 0, rhetoric: 0, total: 0 },
    });
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
    if (!speechSynthesisRef.current) return;

    speechSynthesisRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

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
      const lastAIMessage = [...messages]
        .reverse()
        .find((m) => m.sender === "ai");
      if (lastAIMessage) {
        speakText(lastAIMessage.content);
      }
    }
  };

  const generateAIResponse = (
    userMessage: string,
    isOpening = false
  ): string => {
    if (isOpening) {
      const openingResponses = [
        "I must respectfully disagree with this position. The evidence clearly demonstrates that the potential risks far outweigh any perceived benefits, and implementing this approach could lead to significant unintended consequences.",
        "While this perspective has some merit, I believe it fundamentally misunderstands the core issues at stake. Historical precedent and current data suggest that the opposite approach would be far more effective.",
        "I appreciate this viewpoint, but I must argue against it based on substantial evidence. The research consistently shows that this position overlooks critical factors that could undermine its effectiveness.",
      ];
      return openingResponses[
        Math.floor(Math.random() * openingResponses.length)
      ];
    }

    const responses = [
      "That's an interesting point, but I have to disagree. When we consider the evidence, we find that the opposite is often true. Studies have shown that this approach leads to diminishing returns and unexpected complications.",
      "While I understand your perspective, there are several factors you might not be considering. First, the economic impact would be significant, and second, the social implications could be far-reaching.",
      "I appreciate your argument, but let me offer a counterpoint. If we look at historical precedents, we can see that similar approaches have led to outcomes that contradict your position.",
      "That's a common misconception. The data actually suggests that the reality is more nuanced. When we examine the statistics and expert opinions, a different picture emerges.",
      "Your argument has merit, but it overlooks a critical aspect of this issue. We need to also consider the long-term consequences and potential for unintended effects.",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Topic Selection Modal Component
  const TopicSelectionModal = () => {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [userPosition, setUserPosition] = useState<"for" | "against" | "">(
      ""
    );
    const [customTopic, setCustomTopic] = useState("");

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{
            opacity: selectedTopic ? 0.0 : 0.0,
            scale: selectedTopic ? 0.9 : 0.9,
          }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Select Debate Topic</h2>

            <div className="space-y-3 mb-6">
              {predefinedTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.title)}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                    selectedTopic === topic.title
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Badge variant="secondary" className="mb-2">
                    {topic.category}
                  </Badge>
                  <p className="font-medium">{topic.title}</p>
                </button>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <label className="block text-sm font-medium mb-2">
                Custom Topic:
              </label>
              <Input
                value={customTopic}
                onChange={(e) => {
                  setCustomTopic(e.target.value);
                  if (e.target.value) setSelectedTopic("");
                }}
                placeholder="Enter your own debate topic..."
              />
            </div>

            {(selectedTopic || customTopic) && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Choose Your Position:</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setUserPosition("for")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      userPosition === "for"
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-border"
                    }`}
                  >
                    <div className="text-lg mb-1">✅</div>
                    <div className="font-semibold">FOR</div>
                  </button>
                  <button
                    onClick={() => setUserPosition("against")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      userPosition === "against"
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : "border-border"
                    }`}
                  >
                    <div className="text-lg mb-1">❌</div>
                    <div className="font-semibold">AGAINST</div>
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={() => setShowTopicModal(false)}
                variant="outline"
              >
                Cancel
              </Button>
              {(selectedTopic || customTopic) && userPosition && (
                <Button
                  onClick={() => {
                    startDebate(selectedTopic, userPosition, customTopic);
                    setShowTopicModal(false);
                  }}
                >
                  Start Debate
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Results Modal Component
  const ResultsModal = () => {
    const winner = scores.user.total > scores.ai.total ? "user" : "ai";
    const margin = Math.abs(scores.user.total - scores.ai.total);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto"
        >
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">
                {winner === "user" ? "🏆" : "🤖"}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {winner === "user" ? "Congratulations!" : "AI Wins!"}
              </h2>
              <p className="text-muted-foreground">
                {winner === "user"
                  ? `You won by ${margin} points!`
                  : `AI won by ${margin} points. Great effort!`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg bg-muted">
                <h3 className="font-semibold mb-2">Your Score</h3>
                <div className="text-2xl font-bold text-primary">
                  {scores.user.total}
                </div>
                <div className="text-xs space-y-1 mt-2">
                  <div>Logic: {scores.user.logic}</div>
                  <div>Evidence: {scores.user.evidence}</div>
                  <div>Rhetoric: {scores.user.rhetoric}</div>
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <h3 className="font-semibold mb-2">AI Score</h3>
                <div className="text-2xl font-bold text-destructive">
                  {scores.ai.total}
                </div>
                <div className="text-xs space-y-1 mt-2">
                  <div>Logic: {scores.ai.logic}</div>
                  <div>Evidence: {scores.ai.evidence}</div>
                  <div>Rhetoric: {scores.ai.rhetoric}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={resetDebate} className="flex-1">
                New Debate
              </Button>
              <Button
                onClick={() => setDebateState("debate-active")}
                variant="outline"
              >
                Review
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  if (debateState === "topic-selection") {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <Brain className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-2">Welcome to DebateMate</h1>
          <p className="text-muted-foreground mb-6">
            Choose a topic and position to start your AI-powered debate
            experience
          </p>
          <Button onClick={() => setShowTopicModal(true)} size="lg">
            Select Topic & Start Debate
          </Button>
        </motion.div>
        {showTopicModal && <TopicSelectionModal />}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border bg-accent px-4 sm:px-6 rounded-md">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
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
            <p className="text-xs text-muted-foreground">AI Debate Opponent</p>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Timer */}
          {debateState === "debate-active" && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-background border">
              <Clock className="w-4 h-4" />
              <span
                className={`font-mono text-sm ${
                  timeLeft < 30 ? "text-destructive" : "text-primary"
                }`}
              >
                {formatTimeLeft(timeLeft)}
              </span>
            </div>
          )}

          {/* Round Counter */}
          {debateState === "debate-active" && (
            <Badge variant="outline">
              Round {currentRound}/{maxRounds}
            </Badge>
          )}

          {/* Topic Badge */}
          {topic && (
            <Badge
              variant="secondary"
              className="hidden sm:inline-flex max-w-48 truncate"
            >
              {topic}
            </Badge>
          )}

          {/* Scores */}
          {debateState === "debate-active" && (
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-primary font-semibold">
                {scores.user.total}
              </span>
              <span className="text-muted-foreground">vs</span>
              <span className="text-destructive font-semibold">
                {scores.ai.total}
              </span>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowTopicModal(true)}>
                <Target className="mr-2 h-4 w-4" />
                Change Topic
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsTimerActive(!isTimerActive)}
              >
                {isTimerActive ? (
                  <Pause className="mr-2 h-4 w-4" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                {isTimerActive ? "Pause Timer" : "Resume Timer"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={endDebate}>
                <Flag className="mr-2 h-4 w-4" />
                End Debate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={resetDebate}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Debate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Save Transcript
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </DropdownMenuItem>
              <DropdownMenuItem>Share Debate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Chat area with enhanced UI */}
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main Chat */}
            <div className="lg:col-span-3 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium">
                          {message.sender === "user"
                            ? "You"
                            : "Professor Logic"}
                        </span>
                        {message.round && (
                          <Badge variant="outline" className="text-xs">
                            Round {message.round}
                          </Badge>
                        )}
                        <span className="text-xs opacity-70 ml-auto">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sidebar with scores and tips */}
            {debateState === "debate-active" && (
              <div className="lg:col-span-1 space-y-4">
                {/* Live Scores */}
                <div className="bg-accent rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    Live Scores
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">You</span>
                        <span className="font-bold text-primary">
                          {scores.user.total}
                        </span>
                      </div>
                      <div className="text-xs space-y-1 text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Logic</span>
                          <span>{scores.user.logic}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Evidence</span>
                          <span>{scores.user.evidence}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rhetoric</span>
                          <span>{scores.user.rhetoric}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">AI</span>
                        <span className="font-bold text-destructive">
                          {scores.ai.total}
                        </span>
                      </div>
                      <div className="text-xs space-y-1 text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Logic</span>
                          <span>{scores.ai.logic}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Evidence</span>
                          <span>{scores.ai.evidence}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rhetoric</span>
                          <span>{scores.ai.rhetoric}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="bg-accent rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    Quick Tips
                  </h3>
                  <div className="text-xs space-y-2 text-muted-foreground">
                    <p>• Use specific examples and data</p>
                    <p>• Address counterarguments directly</p>
                    <p>• Stay focused on the main topic</p>
                    <p>• Use logical reasoning chains</p>
                    <p>• Cite credible sources when possible</p>
                  </div>
                </div>

                {/* Round Progress */}
                <div className="bg-accent rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Round Progress</h3>
                  <div className="space-y-2">
                    {Array.from({ length: maxRounds }, (_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full ${
                          i + 1 < currentRound
                            ? "bg-green-500"
                            : i + 1 === currentRound
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Round {currentRound} of {maxRounds}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Input area */}
      <div className="border rounded-md bg-accent p-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-end gap-2">
            <Button
              variant="outline"
              size="icon"
              className={
                isRecording ? "bg-red-100 text-red-500 dark:bg-red-900/20" : ""
              }
              onClick={toggleRecording}
              disabled={debateState !== "debate-active"}
            >
              {isRecording ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>

            <div className="relative flex-1">
              <Input
                placeholder={
                  debateState === "debate-active"
                    ? "Type your argument..."
                    : "Debate not active"
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-10"
                disabled={debateState !== "debate-active" || isTyping}
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
              className={
                isSpeaking
                  ? "bg-blue-100 text-blue-500 dark:bg-blue-900/20"
                  : ""
              }
              onClick={toggleSpeaking}
            >
              {isSpeaking ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>

            <Button
              onClick={handleSendMessage}
              disabled={
                !inputValue.trim() ||
                debateState !== "debate-active" ||
                isTyping
              }
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>

          {/* Status bar */}
          <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              {debateState === "debate-active" && (
                <>
                  <span>
                    Round {currentRound}/{maxRounds}
                  </span>
                  <span>Time: {formatTimeLeft(timeLeft)}</span>
                  <span>Messages: {messages.length}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isRecording && (
                <span className="text-red-500">● Recording...</span>
              )}
              {isTyping && (
                <span className="text-blue-500">AI is typing...</span>
              )}
              {debateState === "debate-active" && (
                <span className={timeLeft < 30 ? "text-red-500" : ""}>
                  {timeLeft < 30 && "⚠️ Time running out!"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showTopicModal && <TopicSelectionModal />}
      {debateState === "debate-ended" && <ResultsModal />}
    </div>
  );
}
