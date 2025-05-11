"use client"

import React, { useState } from "react"
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog"

type CaseStudyProps = {
    title: string
    description: string
    content: React.ReactNode
}

export function CaseStudy(study : CaseStudyProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold">
                {study.title}
            </CardTitle>
            <CardDescription>
                {study.description}
            </CardDescription>
        </CardHeader>
        <CardContent className="line-clamp-2">
            {study.content}
        </CardContent>
        <CardFooter>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="cursor-pointer underline">
            Read More..
        </DialogTrigger>
        <DialogOverlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out" />
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-card p-6 shadow-lg transition-all duration-300 ease-in-out sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{study.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{study.description}</DialogDescription>
          </DialogHeader>
            {study.content}
          <DialogClose className="cursor-pointer" />
        </DialogContent>
      </Dialog>
      </CardFooter>
    </Card>
  )
}