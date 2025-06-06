"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  TrendingUp,
  Video,
  BookOpen,
  Award,
} from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  //   const { data: session } = useSession()
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

  function newDebate(){
    router.push('/new-debate');
  }

  return (
    <motion.div
      className="grid gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Welcome section */}
     <motion.div variants={item}>
  <Card>
    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome back, <span className="font-medium">John Doe</span>!
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your debate training today.
        </p>
      </div>
      <Button
        onClick={newDebate}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        Start New Debate
      </Button>
    </CardContent>
  </Card>
</motion.div>

      {/* Stats overview */}
      <motion.div
        variants={item}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Debates</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Learning Progress
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Skill Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">745</div>
            <p className="text-xs text-green-500">↑ 23 points this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              3 more to next level
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent activity and upcoming tasks */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest debate sessions and feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <Video className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Climate Change Debate</p>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI feedback: Strong opening, needs work on rebuttals
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Yesterday at 2:30 PM</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Logical Fallacies Module</p>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Completed 4 of 6 lessons in this module
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <Award className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">
                    Achievement Unlocked: Consistent Debater
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Completed 5 debates in one week
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>3 days ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto" asChild>
                <Link href="/dashboard/debates">
                  View all activity
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>
                Scheduled sessions and assignments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                  <Video className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">
                    Practice Debate: Universal Basic Income
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Scheduled practice session with AI opponent
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Today at 4:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-100 p-2 text-red-600">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">
                    Complete Persuasive Techniques Module
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2 remaining lessons in your learning path
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Due tomorrow</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <Video className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">Group Debate: Education Reform</p>
                  <p className="text-sm text-muted-foreground">
                    Live session with 3 other students
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Friday at 5:30 PM</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto" asChild>
                <Link href="/dashboard/learning-path">
                  View all tasks
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* AI Feedback Highlights */}
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>AI Feedback Highlights</CardTitle>
            <CardDescription>
              Recent insights from your debate performances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 font-semibold">Strengths</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                    <span>
                      <strong>Clear structure:</strong> Your arguments follow a
                      logical progression that&apos;s easy to follow.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                    <span>
                      <strong>Evidence usage:</strong> You effectively
                      incorporate relevant data and examples.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                    <span>
                      <strong>Vocal delivery:</strong> Your pace and clarity
                      have improved significantly.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 font-semibold">Areas for Improvement</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
                    <span>
                      <strong>Rebuttals:</strong> Work on addressing
                      counterarguments more directly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
                    <span>
                      <strong>Time management:</strong> Your closing statements
                      often feel rushed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
                    <span>
                      <strong>Filler words:</strong> Reduce usage of
                      &quot;um&quot; and &quot;like&quot; for more polished
                      delivery.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="ml-auto" asChild>
              <Link href="/dashboard/debates">View Full Analysis</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
