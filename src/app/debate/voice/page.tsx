"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Mic, MicOff, MessageSquare, Users, Copy, LogOut } from "lucide-react";
import { WebRTCManager } from "@/lib/webrtc";
import { toast } from "sonner";

type Message = {
  role: "user" | "other";
  content: string;
  peerId?: string;
};

export default function VoiceDebate() {
  const [roomId, setRoomId] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [peers, setPeers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const webrtcRef = useRef<WebRTCManager | null>(null);

  useEffect(() => {
    return () => {
      webrtcRef.current?.cleanup();
    };
  }, []);

  const createRoom = async () => {
    try {
      setIsLoading(true);
      const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
      setRoomId(newRoomId);
      
      const manager = new WebRTCManager(
        newRoomId,
        (peerId) => {
          setPeers(prev => [...prev, peerId]);
          setMessages(prev => [...prev, {
            role: "other",
            content: "joined the room",
            peerId
          }]);
        },
        (peerId) => {
          setPeers(prev => prev.filter(id => id !== peerId));
          setMessages(prev => [...prev, {
            role: "other",
            content: "left the room",
            peerId
          }]);
        },
        (peerId, message) => {
          setMessages(prev => [...prev, {
            role: "other",
            content: message,
            peerId
          }]);
        }
      );

      await manager.initialize();
      webrtcRef.current = manager;
      setIsInRoom(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create room");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const joinRoom = async () => {
    if (!roomId.trim()) return;

    try {
      setIsLoading(true);
      const manager = new WebRTCManager(
        roomId,
        (peerId) => {
          setPeers(prev => [...prev, peerId]);
          setMessages(prev => [...prev, {
            role: "other",
            content: "joined the room",
            peerId
          }]);
        },
        (peerId) => {
          setPeers(prev => prev.filter(id => id !== peerId));
          setMessages(prev => [...prev, {
            role: "other",
            content: "left the room",
            peerId
          }]);
        },
        (peerId, message) => {
          setMessages(prev => [...prev, {
            role: "other",
            content: message,
            peerId
          }]);
        }
      );

      await manager.initialize();
      webrtcRef.current = manager;
      setIsInRoom(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to join room");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendTextMessage = () => {
    if (!textInput.trim() || !webrtcRef.current) return;
    
    webrtcRef.current.sendMessage(textInput);
    setMessages(prev => [...prev, { role: "user", content: textInput }]);
    setTextInput("");
  };

  const toggleMute = async () => {
    if (!webrtcRef.current) return;
    
    try {
      await webrtcRef.current.toggleMute(!isMuted);
      setIsMuted(!isMuted);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to toggle mute");
      }
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room ID copied to clipboard");
  };

  const leaveRoom = () => {
    webrtcRef.current?.cleanup();
    webrtcRef.current = null;
    setIsInRoom(false);
    setPeers([]);
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        {!isInRoom ? (
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-4">
                Voice Debate
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Start Voice Debate
              </h1>
              <p className="text-xl text-gray-600">
                Create or join a voice debate room to engage in real-time discussions
              </p>
            </div>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Voice Room</h3>
                    <p className="text-sm text-gray-500">Real-time voice and text chat</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    onClick={createRoom}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Room..." : "Create New Room"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or join existing room</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Input
                      placeholder="Enter Room ID"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                      className="h-12 text-lg"
                      disabled={isLoading}
                    />
                    <Button 
                      className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      onClick={joinRoom}
                      disabled={!roomId.trim() || isLoading}
                    >
                      {isLoading ? "Joining Room..." : "Join Room"}
                    </Button>
                  </div>
                </div>
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
              <h1 className="text-3xl font-bold mb-2 text-gray-900">Voice Debate Room</h1>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <span>Room ID: {roomId}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyRoomId}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {peers.length} {peers.length === 1 ? "participant" : "participants"} in room
              </p>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <Tabs defaultValue="voice" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="voice" className="flex items-center gap-2">
                      <Mic className="h-4 w-4" />
                      Voice Chat
                    </TabsTrigger>
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Text Chat
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="voice" className="mt-6">
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleMute}
                          className="h-16 w-16 text-white hover:bg-white/20"
                        >
                          {isMuted ? (
                            <MicOff className="h-8 w-8" />
                          ) : (
                            <Mic className="h-8 w-8" />
                          )}
                        </Button>
                      </div>
                      <p className="text-gray-600">
                        {isMuted ? "Microphone is muted" : "Microphone is active"}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="mt-6">
                    <div className="space-y-6">
                      <div className="space-y-4 max-h-[400px] overflow-y-auto">
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
                              {message.peerId && (
                                <p className="text-xs text-gray-500 mb-1">
                                  {message.peerId.slice(0, 6)}
                                </p>
                              )}
                              <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <Input
                          placeholder="Type a message..."
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              sendTextMessage();
                            }
                          }}
                        />
                        <Button 
                          onClick={sendTextMessage}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          disabled={!textInput.trim()}
                        >
                          <MessageSquare className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={leaveRoom}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Leave Room
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 