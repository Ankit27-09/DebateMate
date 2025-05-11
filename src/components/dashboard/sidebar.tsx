"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  User,
  Settings,
  MessageSquare,
  Video,
  BookOpen,
  BarChart,
  Bot,
  Trophy,
  School,
  Menu,
  LogOut,
  LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMobile } from "@/hooks/use-mobile"
import { SignOutButton } from "@clerk/nextjs"

type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  role?: string[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "My Debates",
    href: "/debates",
    icon: Video,
  },
  {
    title: "Learning Path",
    href: "/learning-path",
    icon: BookOpen,
  },
//   {
//     title: "Forum",
//     href: "/forum",
//     icon: MessageSquare,
//   },
//   {
//     title: "Mentor Mode",
//     href: "/mentor",
//     icon: Bot,
//   },
//   {
//     title: "Achievements",
//     href: "/achievements",
//     icon: Trophy,
//   },
//   {
//     title: "Educator Hub",
//     href: "/educator",
//     icon: School,
//     role: ["educator"],
//   },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Reset collapsed state when switching between mobile and desktop
  useEffect(() => {
    setIsCollapsed(false)
  }, [isMobile])


  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-3 py-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
          onClick={() => isMobile && setIsCollapsed(true)}
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
          {!isCollapsed && <span>DebateMate</span>}
        </Link>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <TooltipProvider key={item.href} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    onClick={() => isMobile && setIsCollapsed(true)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                      isCollapsed && "justify-center p-2",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
                    {!isCollapsed && <span>{item.title}</span>}
                    {pathname === item.href && !isCollapsed && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute left-0 h-8 w-1 rounded-r-full bg-primary"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${"John Doe"}&size=64&background=random`} alt={"John Doe"} />
            <AvatarFallback>
              {"John Doe".split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="truncate text-sm font-medium">{"John Doe"}</div>
              <div className="truncate text-xs text-muted-foreground">{"john.doe@4mail.com"}</div>
            </div>
          )}
          <SignOutButton>
            <Button variant="ghost" size="icon" aria-label="Log out">
              <LogOut className="h-4 w-4" />
            </Button>
          </SignOutButton>
            
        </div>
      </div>
    </div>
  )

  // Mobile sidebar using Sheet component
  if (isMobile) {
    return (
      <>
        <Sheet open={!isCollapsed} onOpenChange={setIsCollapsed}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Desktop sidebar
  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]",
      )}
    >
      <SidebarContent />
    </div>
  )
}

