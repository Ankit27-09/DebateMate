"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bot, Mic, Video, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DebateOptions() {
  const router = useRouter();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        {/* Back to Dashboard button */}
        <div className="max-w-6xl mx-auto mb-8">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-4">
            Choose Your Format
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Start Your Debate
          </h1>
          <p className="text-xl text-gray-600">
            Select your preferred debate format and begin your journey to becoming a better debater
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* AI Debate Option */}
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl">Debate Against AI</CardTitle>
                <CardDescription>Challenge our AI opponent powered by Gemini</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  onClick={() => router.push('/debate/ai')}
                >
                  Start AI Debate
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Voice Debate Option */}
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl">Voice Debate</CardTitle>
                <CardDescription>Join a voice chat room for real-time debate</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  onClick={() => router.push('/debate/voice')}
                >
                  Join Voice Room
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Video Debate Option */}
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl">Video Debate</CardTitle>
                <CardDescription>Start a video debate using Google Meet</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  onClick={() => router.push('/debate/video')}
                >
                  Start Video Debate
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 