"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Video, VideoOff, Users, Copy, LogOut } from "lucide-react";

export default function VideoDebate() {
  const [roomId, setRoomId] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(newRoomId);
    setIsInRoom(true);
    // TODO: Initialize Google Meet integration
  };

  const joinRoom = () => {
    if (!roomId.trim()) return;
    setIsInRoom(true);
    // TODO: Join existing Google Meet room
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // TODO: Implement actual video toggle functionality
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
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
                Video Debate
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Start Video Debate
              </h1>
              <p className="text-xl text-gray-600">
                Create or join a video debate room powered by Google Meet
              </p>
            </div>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Video className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Video Room</h3>
                    <p className="text-sm text-gray-500">Powered by Google Meet</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    onClick={createRoom}
                  >
                    Create New Room
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
                    />
                    <Button 
                      className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      onClick={joinRoom}
                      disabled={!roomId.trim()}
                    >
                      Join Room
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
              <h1 className="text-3xl font-bold mb-2 text-gray-900">Video Debate Room</h1>
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
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-indigo-600" />
                    </div>
                    <p className="text-gray-600">Video stream will appear here</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={toggleVideo}
                    className="flex items-center gap-2"
                  >
                    {isVideoEnabled ? (
                      <>
                        <Video className="h-5 w-5" />
                        Disable Video
                      </>
                    ) : (
                      <>
                        <VideoOff className="h-5 w-5" />
                        Enable Video
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setIsInRoom(false)}
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