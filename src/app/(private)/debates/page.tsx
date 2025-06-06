"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Video,
  Clock,
  Calendar,
  Search,
  Filter,
  Plus,
  FileText,
  BarChart,
  Download,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// Mock debate data
const debates = [
  {
    id: 1,
    title: "Climate Change Policy Debate",
    date: "May 10, 2023",
    duration: "12:45",
    topic: "Environmental",
    position: "Affirmative",
    status: "Completed",
    score: 87,
    improvement: "+5",
    transcript: true,
    feedback: true,
  },
  {
    id: 2,
    title: "Universal Basic Income",
    date: "April 28, 2023",
    duration: "15:20",
    topic: "Economic",
    position: "Negative",
    status: "Completed",
    score: 82,
    improvement: "+3",
    transcript: true,
    feedback: true,
  },
  {
    id: 3,
    title: "Artificial Intelligence Regulation",
    date: "April 15, 2023",
    duration: "14:10",
    topic: "Technology",
    position: "Affirmative",
    status: "Completed",
    score: 79,
    improvement: "+7",
    transcript: true,
    feedback: true,
  },
  {
    id: 4,
    title: "Education Reform Debate",
    date: "March 22, 2023",
    duration: "16:35",
    topic: "Education",
    position: "Negative",
    status: "Completed",
    score: 75,
    improvement: "+2",
    transcript: true,
    feedback: true,
  },
  {
    id: 5,
    title: "Healthcare Access Debate",
    date: "March 10, 2023",
    duration: "13:50",
    topic: "Healthcare",
    position: "Affirmative",
    status: "Completed",
    score: 72,
    improvement: "+4",
    transcript: true,
    feedback: true,
  },
]

export default function DebatesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDebates = debates.filter((debate) => debate.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
      <motion.div className="grid gap-6" variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search debates..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Topics</DropdownMenuItem>
                <DropdownMenuItem>Environmental</DropdownMenuItem>
                <DropdownMenuItem>Economic</DropdownMenuItem>
                <DropdownMenuItem>Technology</DropdownMenuItem>
                <DropdownMenuItem>Education</DropdownMenuItem>
                <DropdownMenuItem>Healthcare</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              asChild
            >
              <Link href="/debate/options">New Debate</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Debates</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="highest">Highest Rated</TabsTrigger>
              <TabsTrigger value="most-improved">Most Improved</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left font-medium">Debate</th>
                          <th className="px-4 py-3 text-left font-medium">Date</th>
                          <th className="px-4 py-3 text-left font-medium">Duration</th>
                          <th className="px-4 py-3 text-left font-medium">Topic</th>
                          <th className="px-4 py-3 text-left font-medium">Position</th>
                          <th className="px-4 py-3 text-left font-medium">Score</th>
                          <th className="px-4 py-3 text-left font-medium">Resources</th>
                          <th className="px-4 py-3 text-left font-medium"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredDebates.map((debate) => (
                          <tr key={debate.id} className="hover:bg-muted/50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Video className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{debate.title}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{debate.date}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{debate.duration}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline">{debate.topic}</Badge>
                            </td>
                            <td className="px-4 py-3">{debate.position}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{debate.score}</span>
                                <span className="text-xs text-green-500">{debate.improvement}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {debate.transcript && (
                                  <Button variant="ghost" size="icon" title="View Transcript">
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                )}
                                {debate.feedback && (
                                  <Button variant="ghost" size="icon" title="View Feedback">
                                    <BarChart className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="icon" title="Download">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Share</DropdownMenuItem>
                                  <DropdownMenuItem>Rename</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recent" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">Your most recent debates</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="highest" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">Your highest rated debates</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="most-improved" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">Debates with the most improvement</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your debate performance metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Overall Score</p>
                      <p className="text-xs text-muted-foreground">Average across all debates</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">79/100</p>
                      <p className="text-xs text-green-500">↑ 4.2 points since last month</p>
                    </div>
                  </div>
                  <Progress value={79} className="h-2" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Argument Structure</p>
                      <p className="text-sm font-medium">85/100</p>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Evidence Usage</p>
                      <p className="text-sm font-medium">82/100</p>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Rebuttal Effectiveness</p>
                      <p className="text-sm font-medium">76/100</p>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Delivery & Presentation</p>
                      <p className="text-sm font-medium">73/100</p>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto">
                View Detailed Analytics
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
  )
}
