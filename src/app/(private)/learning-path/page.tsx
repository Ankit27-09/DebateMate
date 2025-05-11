"use client"

import { motion } from "framer-motion"
import {
  BookOpen,
  CheckCircle,
  Clock,
  Calendar,
  ArrowRight,
  Play,
  FileText,
  Award,
  Brain,
  MessageSquare,
  Video,
  Lightbulb,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LearningPathPage() {

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
      <motion.div className="grid gap-6" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Your Personalized Learning Path</h2>
                  <p className="text-muted-foreground">
                    AI-tailored curriculum based on your debate style and skill level
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">68%</p>
                    <p className="text-xs text-muted-foreground">Overall Progress</p>
                  </div>
                  <Progress value={68} className="h-2 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="current">
            <TabsList>
              <TabsTrigger value="current">Current Modules</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="mt-4 space-y-6">
              {/* Current Module */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Due in 3 days</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">Logical Fallacies in Debate</CardTitle>
                  <CardDescription>Learn to identify and counter common logical fallacies in arguments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>4 of 6 lessons completed</span>
                      </div>
                      <div className="text-sm font-medium">67%</div>
                    </div>
                    <Progress value={67} className="h-2" />

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Introduction to Logical Fallacies</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Ad Hominem and Appeal to Authority</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Straw Man and Red Herring</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">False Dichotomy and Slippery Slope</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                        <span className="text-sm">Circular Reasoning and Begging the Question</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                        <span className="text-sm">Practice: Identifying and Countering Fallacies</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">
                    Continue Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Another Current Module */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Due in 7 days</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">Persuasive Speaking Techniques</CardTitle>
                  <CardDescription>Master the art of persuasive delivery and effective communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>2 of 5 lessons completed</span>
                      </div>
                      <div className="text-sm font-medium">40%</div>
                    </div>
                    <Progress value={40} className="h-2" />

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Principles of Persuasive Speaking</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Voice Modulation and Emphasis</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                        <span className="text-sm">Body Language and Non-verbal Communication</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                        <span className="text-sm">Rhetorical Devices and Figures of Speech</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                        <span className="text-sm">Practice: Delivering a Persuasive Argument</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">
                    Continue Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Modules</CardTitle>
                  <CardDescription>Modules you've successfully finished</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-green-100 p-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Debate Fundamentals</h3>
                        <p className="text-sm text-muted-foreground">Core principles and structure of formal debates</p>
                      </div>
                      <div className="text-sm text-muted-foreground">Completed on April 15, 2023</div>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-green-100 p-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Research Methodology</h3>
                        <p className="text-sm text-muted-foreground">
                          Effective research techniques for debate preparation
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">Completed on March 22, 2023</div>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-green-100 p-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Argument Construction</h3>
                        <p className="text-sm text-muted-foreground">Building strong, evidence-based arguments</p>
                      </div>
                      <div className="text-sm text-muted-foreground">Completed on March 5, 2023</div>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Modules</CardTitle>
                  <CardDescription>Your future learning modules based on your progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Advanced Rebuttal Techniques</h3>
                        <p className="text-sm text-muted-foreground">Strategies for effective counterarguments</p>
                      </div>
                      <div className="text-sm text-muted-foreground">Unlocks in 10 days</div>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Cross-Examination Skills</h3>
                        <p className="text-sm text-muted-foreground">Techniques for effective questioning</p>
                      </div>
                      <div className="text-sm text-muted-foreground">Unlocks in 17 days</div>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Debate Ethics and Etiquette</h3>
                        <p className="text-sm text-muted-foreground">Professional conduct in formal debates</p>
                      </div>
                      <div className="text-sm text-muted-foreground">Unlocks in 24 days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommended" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended for You</CardTitle>
                  <CardDescription>AI-suggested modules based on your performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Statistical Analysis in Debates</h3>
                        <p className="text-sm text-muted-foreground">Using data effectively to support arguments</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Add to Path
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Handling Difficult Opponents</h3>
                        <p className="text-sm text-muted-foreground">Strategies for maintaining composure and focus</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Add to Path
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Visual Aids in Presentations</h3>
                        <p className="text-sm text-muted-foreground">Enhancing arguments with effective visuals</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Add to Path
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={item} className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Supplementary materials to enhance your learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <FileText className="mt-0.5 h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">The Art of Persuasion: A Comprehensive Guide</h3>
                  <p className="text-sm text-muted-foreground">PDF • 24 pages</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <Video className="mt-0.5 h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">Master Class: Effective Rebuttals</h3>
                  <p className="text-sm text-muted-foreground">Video • 45 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <FileText className="mt-0.5 h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">Logical Fallacies: Recognition and Response</h3>
                  <p className="text-sm text-muted-foreground">PDF • 18 pages</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <Play className="mt-0.5 h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">Interactive Quiz: Identifying Fallacies</h3>
                  <p className="text-sm text-muted-foreground">Quiz • 20 questions</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto">
                View All Resources
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Learning Stats</CardTitle>
              <CardDescription>Track your progress and achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 text-center">
                  <Brain className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-xs text-muted-foreground">Modules Completed</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <Clock className="mx-auto mb-2 h-6 w-6 text-purple-600" />
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs text-muted-foreground">Hours of Learning</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <Award className="mx-auto mb-2 h-6 w-6 text-amber-600" />
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Skills Mastered</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <MessageSquare className="mx-auto mb-2 h-6 w-6 text-green-600" />
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-xs text-muted-foreground">Quiz Success Rate</p>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Current Learning Streak</h3>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-full rounded-full bg-muted">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: "60%" }}
                    />
                  </div>
                  <span className="text-sm font-medium">6 days</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">4 more days to reach your longest streak!</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto">
                View Detailed Stats
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
  )
}
