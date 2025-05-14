"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Play, Pause, RotateCcw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const demoConversation = [
    {
      speaker: "AI",
      text: "Welcome to DebateMate! Let's debate the topic: 'Should social media platforms be regulated by governments?'",
    },
    {
      speaker: "User",
      text: "I believe they should be regulated because they have too much influence over public discourse and spread misinformation.",
    },
    {
      speaker: "AI",
      text: "That's a valid concern. However, wouldn't government regulation potentially infringe on free speech rights? Who decides what's misinformation?",
    },
    {
      speaker: "User",
      text: "Free speech has limits, especially when it causes harm. Independent fact-checkers could help determine misinformation, not just governments.",
    },
    {
      speaker: "AI",
      text: "Interesting point about independent fact-checkers. But how do we ensure they remain truly independent and unbiased in their assessments?",
    },
    {
      speaker: "User",
      text: "Through transparency in their methodology and diverse representation. Multiple fact-checkers could also review the same content.",
    },
    {
      speaker: "AI",
      text: "You've made a compelling argument for a balanced approach. Let's analyze your debate performance.",
    },
  ]

  const feedbackSteps = [
    {
      title: "Argument Structure",
      content:
        "Your arguments followed a logical structure with clear claims and supporting evidence. You effectively addressed counterarguments.",
      score: 85,
    },
    {
      title: "Evidence Quality",
      content:
        "You provided conceptual solutions but could strengthen your position with specific examples or data points.",
      score: 70,
    },
    {
      title: "Rhetorical Effectiveness",
      content:
        "Your language was clear and persuasive. You maintained a respectful tone while effectively challenging opposing viewpoints.",
      score: 90,
    },
    {
      title: "Overall Assessment",
      content:
        "You demonstrated strong critical thinking and adaptability in your arguments. With more specific evidence, your position would be even stronger.",
      score: 82,
    },
  ]

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isPlaying && currentStep < demoConversation.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        setProgress(((currentStep + 1) / (demoConversation.length - 1)) * 100)
      }, 3000)
    }

    return () => clearTimeout(timer)
  }, [currentStep, isPlaying, demoConversation.length])

  const resetDemo = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 my-16">
        <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <motion.div className="max-w-4xl mx-auto" initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">DebateMate Demo</h1>
          <p className="text-xl text-gray-700 mb-8">
            Watch a simulated debate to see how DebateMate works. This demo shows a conversation and provides feedback
            analysis.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="p-0">
                  <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Demo Debate</h2>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-white hover:bg-indigo-700"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-white hover:bg-indigo-700"
                        onClick={resetDemo}
                      >
                        <RotateCcw className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                    {demoConversation.slice(0, currentStep + 1).map((message, index) => (
                      <motion.div
                        key={index}
                        className={`flex ${message.speaker === "User" ? "justify-end" : "justify-start"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.speaker === "User"
                              ? "bg-indigo-600 text-white rounded-tr-none"
                              : "bg-gray-100 text-gray-800 rounded-tl-none"
                          }`}
                        >
                          <div className="text-xs font-semibold mb-1">
                            {message.speaker === "User" ? "You" : "DebateMate AI"}
                          </div>
                          <div>{message.text}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
                      <span className="text-sm text-gray-500">
                        {currentStep + 1} of {demoConversation.length}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-lg h-full">
                <CardContent className="p-0">
                  <div className="bg-indigo-600 text-white p-4">
                    <h2 className="text-xl font-semibold">Performance Analysis</h2>
                  </div>

                  <div className="p-4 space-y-6">
                    {currentStep < demoConversation.length - 1 ? (
                      <div className="flex items-center justify-center h-[300px] text-gray-500">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                          <p>Analyzing debate performance...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {feedbackSteps.map((feedback, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium text-gray-900">{feedback.title}</h3>
                              <span className="text-sm font-semibold">{feedback.score}/100</span>
                            </div>
                            <Progress value={feedback.score} className="h-2 mb-2" />
                            <p className="text-sm text-gray-600">{feedback.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" asChild>
              <Link href="/start-debate">
                Try It Yourself
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
