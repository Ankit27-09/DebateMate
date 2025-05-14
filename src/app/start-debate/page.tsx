"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Send, Mic, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function StartDebatePage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [debateStarted, setDebateStarted] = useState(false)
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([])
  const [inputValue, setInputValue] = useState("")

  const popularTopics = [
    "Should college education be free?",
    "Is artificial intelligence dangerous?",
    "Should social media be regulated?",
    "Is climate change the biggest threat to humanity?",
    "Should voting be mandatory?",
    "Is universal basic income a good idea?",
  ]

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic)
  }

  const startDebate = () => {
    setDebateStarted(true)
    setMessages([
      {
        sender: "ai",
        text: `Let's debate: "${selectedTopic}". I'll take the opposing view. Would you like to make the first argument?`,
      },
    ])
  }

  const sendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const newMessages = [...messages, { sender: "user", text: inputValue }]
    setMessages(newMessages)
    setInputValue("")

    // Simulate AI response after a short delay
    setTimeout(() => {
      let aiResponse = ""

      if (newMessages.length === 2) {
        aiResponse =
          "That's an interesting point. However, have you considered the economic implications? The cost of implementation could lead to higher taxes or budget cuts in other important areas."
      } else if (newMessages.length === 4) {
        aiResponse =
          "I understand your perspective on funding sources, but there's also the question of whether this creates the right incentives. Some studies suggest that completely free services are often undervalued by recipients."
      } else {
        aiResponse =
          "You make a compelling argument. Let me challenge that by asking: how would you ensure quality doesn't suffer when the focus shifts to providing education to everyone rather than maintaining high standards?"
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }])
    }, 1500)
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 my-17">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {!debateStarted ? (
          <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeIn}>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Start Your First Debate</h1>
            <p className="text-xl text-gray-700 mb-8">
              Choose a topic or create your own to begin debating with our AI opponent.
            </p>

            <Tabs defaultValue="popular" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="popular">Popular Topics</TabsTrigger>
                <TabsTrigger value="custom">Custom Topic</TabsTrigger>
              </TabsList>

              <TabsContent value="popular">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularTopics.map((topic, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedTopic === topic ? "border-2 border-indigo-500 bg-indigo-50" : ""
                      }`}
                      onClick={() => handleTopicSelect(topic)}
                    >
                      <CardContent className="p-4">
                        <p className="font-medium">{topic}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="custom">
                <Card>
                  <CardContent className="p-4">
                    <Input
                      placeholder="Enter your debate topic here..."
                      className="mb-4"
                      value={selectedTopic || ""}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                    />
                    <p className="text-sm text-gray-500">
                      Tip: Good debate topics are specific, controversial, and balanced.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Button
              size="lg"
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700"
              disabled={!selectedTopic}
              onClick={startDebate}
            >
              Start Debating
              <Brain className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-indigo-600 text-white p-4">
                <h2 className="text-xl font-semibold">Debate: {selectedTopic}</h2>
              </div>

              <div className="h-[60vh] flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.sender === "user"
                            ? "bg-indigo-600 text-white rounded-tr-none"
                            : "bg-gray-100 text-gray-800 rounded-tl-none"
                        }`}
                      >
                        <div className="text-xs font-semibold mb-1">
                          {message.sender === "user" ? "You" : "DebateMate AI"}
                        </div>
                        <div>{message.text}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your argument..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage()
                      }}
                    />
                    <Button variant="ghost" size="icon">
                      <Mic className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button onClick={sendMessage}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Feedback</h3>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                <p>
                  {messages.length <= 2
                    ? "Waiting for your first argument..."
                    : "Your argument is clear, but could be strengthened with specific examples or data. Consider addressing potential counterarguments preemptively."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
