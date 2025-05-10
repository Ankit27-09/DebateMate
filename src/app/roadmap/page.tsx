"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BookOpen, Mic, Trophy, Users, Video, FileText, Award, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Track = "debating" | "speaking"

interface Milestone {
  id: string
  week: number
  title: string
  date: string
  description: string
  icon: React.ReactNode
  track: Track
}

const milestones: Milestone[] = [
  {
    id: "1",
    week: 1,
    title: "Fundamentals of Argumentation",
    date: "Week 1",
    description: "Learn the basic structure of arguments, logical fallacies, and how to construct sound reasoning.",
    icon: <BookOpen className="h-6 w-6" />,
    track: "debating",
  },
  {
    id: "2",
    week: 2,
    title: "Research Techniques",
    date: "Week 2",
    description: "Master the art of finding credible sources and organizing evidence to support your arguments.",
    icon: <FileText className="h-6 w-6" />,
    track: "debating",
  },
  {
    id: "3",
    week: 3,
    title: "Rebuttal Strategies",
    date: "Week 3",
    description: "Develop effective techniques for countering opposing arguments and strengthening your position.",
    icon: <Users className="h-6 w-6" />,
    track: "debating",
  },
  {
    id: "4",
    week: 4,
    title: "Persuasive Techniques",
    date: "Week 4",
    description: "Learn rhetorical devices and persuasion psychology to make your arguments more compelling.",
    icon: <Trophy className="h-6 w-6" />,
    track: "debating",
  },
  {
    id: "5",
    week: 5,
    title: "Advanced Debate Formats",
    date: "Week 5",
    description: "Explore different debate formats including parliamentary, Lincoln-Douglas, and policy debate.",
    icon: <Award className="h-6 w-6" />,
    track: "debating",
  },
  {
    id: "6",
    week: 6,
    title: "Cross-Examination Skills",
    date: "Week 6",
    description: "Master the art of asking effective questions and responding to cross-examination.",
    icon: <CheckCircle className="h-6 w-6" />,
    track: "debating",
  },
  {
    id: "7",
    week: 7,
    title: "Mock Debates",
    date: "Week 7",
    description: "Put your skills to the test in structured practice debates with personalized feedback.",
    icon: <Video className="h-6 w-6" />,
    track: "debating",
  },
  {
    id: "8",
    week: 8,
    title: "Tournament Preparation",
    date: "Week 8",
    description: "Final preparation for competitive debates with advanced strategies and mental preparation.",
    icon: <Trophy className="h-6 w-6" />,
    track: "debating",
  },
  {
    id: "9",
    week: 1,
    title: "Voice Projection & Clarity",
    date: "Week 1",
    description: "Learn techniques to improve your vocal delivery, projection, and articulation.",
    icon: <Mic className="h-6 w-6" />,
    track: "speaking",
  },
  {
    id: "10",
    week: 2,
    title: "Body Language & Presence",
    date: "Week 2",
    description: "Develop confident body language and stage presence for effective communication.",
    icon: <Users className="h-6 w-6" />,
    track: "speaking",
  },
  {
    id: "11",
    week: 3,
    title: "Impromptu Speaking",
    date: "Week 3",
    description: "Practice thinking on your feet and delivering structured responses with minimal preparation.",
    icon: <BookOpen className="h-6 w-6" />,
    track: "speaking",
  },
  {
    id: "12",
    week: 4,
    title: "Storytelling Techniques",
    date: "Week 4",
    description: "Master the art of narrative to make your speeches more engaging and memorable.",
    icon: <FileText className="h-6 w-6" />,
    track: "speaking",
  },
  {
    id: "13",
    week: 5,
    title: "Audience Analysis",
    date: "Week 5",
    description: "Learn to adapt your speaking style to different audiences and contexts.",
    icon: <Users className="h-6 w-6" />,
    track: "speaking",
  },
  {
    id: "14",
    week: 6,
    title: "Advanced Rhetorical Devices",
    date: "Week 6",
    description: "Explore advanced rhetorical techniques to enhance the impact of your speeches.",
    icon: <Award className="h-6 w-6" />,
    track: "speaking",
  },
  {
    id: "15",
    week: 7,
    title: "Speech Delivery Practice",
    date: "Week 7",
    description: "Intensive practice sessions with video recording and detailed feedback.",
    icon: <Video className="h-6 w-6" />,
    track: "speaking",
  },
  {
    id: "16",
    week: 8,
    title: "Public Speaking Showcase",
    date: "Week 8",
    description: "Final presentation showcasing all the skills you've developed throughout the program.",
    icon: <Trophy className="h-6 w-6" />,
    track: "speaking",
  },
]

export default function RoadmapPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track>("debating")
  const [isLoaded, setIsLoaded] = useState(true)

  const filteredMilestones = milestones.filter((milestone) => milestone.track === selectedTrack)

  return (
    <main className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900"
        >
          Learning Roadmap
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto mb-12"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Track</label>
          <Select value={selectedTrack} onValueChange={(value) => setSelectedTrack(value as Track)}>
            <SelectTrigger className="w-full rounded-xl p-4 border-indigo-200 focus:ring-indigo-500">
              <SelectValue placeholder="Select a track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="debating">Debating</SelectItem>
              <SelectItem value="speaking">English Speaking</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-200" />

          {/* Timeline nodes */}
          <div className="space-y-12">
            {filteredMilestones.map((milestone, index) => (
              <TimelineNode
                key={milestone.id}
                milestone={milestone}
                index={index}
                accentColor={selectedTrack === "debating" ? "indigo" : "teal"}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

interface TimelineNodeProps {
  milestone: Milestone
  index: number
  accentColor: "indigo" | "teal"
}

function TimelineNode({ milestone, index, accentColor }: TimelineNodeProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const colorClass =
    accentColor === "indigo"
      ? "bg-indigo-600 text-indigo-600 border-indigo-200"
      : "bg-teal-500 text-teal-500 border-teal-200"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-16"
    >
      {/* Icon circle */}
      <div className={`absolute left-0 p-3 rounded-full ${colorClass.split(" ")[0]} text-white`}>{milestone.icon}</div>

      {/* Content */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
          <span className="text-sm font-medium text-gray-500">{milestone.date}</span>
        </div>
        <p className="text-gray-600">{milestone.description}</p>
      </div>
    </motion.div>
  )
} 