"use client";

import { motion } from "framer-motion";
import {
  Bot,
  MessageSquare,
  Video,
  User,
  Sparkles,
  ArrowRight,
  Play,
  Info,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function MentorPage() {
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

  const mentors = [
    {
      id: 1,
      name: "Professor Logic",
      avatar: "/placeholder.svg?height=80&width=80",
      specialty: "Logical Reasoning",
      description:
        "Specializes in identifying logical fallacies and strengthening argument structure.",
      style: "Analytical",
      difficulty: "Advanced",
    },
    {
      id: 2,
      name: "Diplomat",
      avatar: "/placeholder.svg?height=80&width=80",
      specialty: "Persuasive Speaking",
      description:
        "Focuses on diplomatic language and building consensus through effective communication.",
      style: "Diplomatic",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      name: "Devil's Advocate",
      avatar: "/placeholder.svg?height=80&width=80",
      specialty: "Counter-Arguments",
      description:
        "Challenges your positions with strong opposing viewpoints to strengthen your rebuttals.",
      style: "Challenging",
      difficulty: "Advanced",
    },
    {
      id: 4,
      name: "Coach Carter",
      avatar: "/placeholder.svg?height=80&width=80",
      specialty: "Debate Fundamentals",
      description:
        "Helps beginners master the basics of structured debate and argument formation.",
      style: "Supportive",
      difficulty: "Beginner",
    },
    {
      id: 5,
      name: "Media Maven",
      avatar: "/placeholder.svg?height=80&width=80",
      specialty: "Media Debates",
      description:
        "Simulates fast-paced media environments with interruptions and time pressure.",
      style: "Dynamic",
      difficulty: "Advanced",
    },
    {
      id: 6,
      name: "Policy Wonk",
      avatar: "/placeholder.svg?height=80&width=80",
      specialty: "Policy Debates",
      description:
        "Focuses on evidence-based arguments and detailed policy analysis.",
      style: "Methodical",
      difficulty: "Intermediate",
    },
  ];

  return (
    <motion.div
      className="grid gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">AI Debate Mentors</h2>
                <p className="text-muted-foreground">
                  Practice with AI personas designed to help you improve
                  specific debate skills
                </p>
              </div>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                asChild
              >
                <Link href="/new-debate">
                  Start New Debate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={mentor.avatar || "/placeholder.svg"}
                      alt={mentor.name}
                    />
                    <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {mentor.name}
                      {mentor.id === 1 && (
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                      )}
                    </CardTitle>
                    <CardDescription>{mentor.specialty}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {mentor.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{mentor.style}</Badge>
                  <Badge
                    variant="outline"
                    className={
                      mentor.difficulty === "Beginner"
                        ? "border-green-500 text-green-500"
                        : mentor.difficulty === "Intermediate"
                        ? "border-amber-500 text-amber-500"
                        : "border-red-500 text-red-500"
                    }
                  >
                    {mentor.difficulty}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Info className="h-4 w-4" />
                  <span>Details</span>
                </Button>
                <Button size="sm" className="ml-auto gap-1">
                  <Play className="h-4 w-4" />
                  <span>Debate</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Mentor Sessions</CardTitle>
            <CardDescription>
              Your latest practice debates with AI mentors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Professor Logic"
                  />
                  <AvatarFallback>PL</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Professor Logic</h3>
                    <Badge variant="outline">Logical Reasoning</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Topic: Climate Change Policy
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">2 days ago</div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Video className="h-4 w-4" />
                  <span>Replay</span>
                </Button>
              </div>

              <div className="flex items-center gap-4 rounded-lg border p-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Devil's Advocate"
                  />
                  <AvatarFallback>DA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Devil&apos;s Advocate</h3>
                    <Badge variant="outline">Counter-Arguments</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Topic: Universal Basic Income
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">5 days ago</div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Video className="h-4 w-4" />
                  <span>Replay</span>
                </Button>
              </div>

              <div className="flex items-center gap-4 rounded-lg border p-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Coach Carter"
                  />
                  <AvatarFallback>CC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Coach Carter</h3>
                    <Badge variant="outline">Debate Fundamentals</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Topic: Education Reform
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">1 week ago</div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Video className="h-4 w-4" />
                  <span>Replay</span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="ml-auto">
              View All Sessions
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>How Mentor Mode Works</CardTitle>
            <CardDescription>
              Get the most out of your AI debate practice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Bot className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Choose a Mentor</h3>
                <p className="text-sm text-muted-foreground">
                  Select an AI mentor that specializes in the debate skills you
                  want to improve
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Engage in Debate</h3>
                <p className="text-sm text-muted-foreground">
                  Practice with voice or text on topics of your choice or
                  suggested by the AI
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <User className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Receive Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized analysis and suggestions to improve your
                  debate skills
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="ml-auto">
              Learn More
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
