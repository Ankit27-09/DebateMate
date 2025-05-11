"use client"
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Shield, Brain, Lightbulb, MessageSquare } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"

const features = [
    {
      title: "Secure Authentication",
      description:
        "Protect your data with our robust authentication system. Your debate progress and personal information stay private.",
      icon: Shield,
      color: "bg-blue-100 text-blue-700",
      gradient:"from-indigo-500 to-indigo-700"
    },
    {
      title: "Personalized AI Training",
      description:
        "Get customized feedback and training exercises based on your skill level, debate style, and areas for improvement.",
      icon: Brain,
      color: "bg-purple-100 text-purple-700",
      gradient:"from-teal-500 to-teal-700"
    },
    {
      title: "Gemini-powered Learning Paths",
      description:
        "Follow structured learning paths designed by debate experts and optimized by AI to accelerate your progress.",
      icon: Lightbulb,
      color: "bg-amber-100 text-amber-700",
      gradient:"from-purple-500 to-purple-700"
    },
    {
      title: "Real-time Feedback",
      description: "Receive instant analysis on your arguments, delivery, and persuasiveness during practice sessions.",
      icon: MessageSquare,
      color: "bg-green-100 text-green-700",
      gradient:"from-blue-500 to-blue-700"
    },
  ]
export default function Features() {
  // Create refs for each section
  const sectionRefs = features.map(() => useRef<HTMLDivElement>(null));
  const inViewArray = sectionRefs.map((section) => useInView(section, {amount:0.2}));
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const foundIndex = inViewArray.findIndex((view) => view);
    if (foundIndex !== -1) {
      setActiveIndex((prev) => {
        if (prev === foundIndex) {
            return prev;
        }
        setDirection(foundIndex > prev ? 1 : -1)
        return foundIndex;
      });
    }
  }, [inViewArray]);

  const handleClick = (index:number) => {
    sectionRefs[index].current?.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div>
      <nav 
        className="sticky top-16 z-40 bg-white w-full flex justify-around border-b border-gray-400 p-4 gap-4"
      >
        {features.map((feature, i) => {
          const isActive = activeIndex === i;
          return (
            <Button
              key={feature.color}
              onClick={() => handleClick(i)}
              variant="outline"
              className={cn("relative py-1 basis-1/5 px-2 font-normal cursor-pointer text-center ",
                isActive ? "text-white font-bold hover:text-white" : "text-gray-700"
              )}
            >
              <span className="relative z-10">
                {feature.title}
              </span>
              <AnimatePresence mode="wait">
              {
                activeIndex === i &&
                <motion.div
                initial={direction === 1 ? {left: 0, right: "100%"} : {left: "100%", right: 0}}
                animate={{left: 0, right: 0}}
                transition={{type:"spring", stiffness: 600, damping : 100}}
                exit={direction === 1 ? {left: "100%", right: 0} : {left: 0, right: "100%"}}
                className="absolute inset-0 bg-indigo-400 rounded-lg z-0"
              />
            }
            </AnimatePresence>
            </Button>
          );
        })}
        
        {/* This is the animated background element that will move between buttons */}
      </nav>

      {features.map((feature, i) => (
        <section
          key={feature.color}
          id={feature.color}
          ref={sectionRefs[i]}
          className="min-h-[50vh] px-12 p-4 group container border-b scroll-mt-16 grid grid-cols-2 justify-center items-center"
        >
        <div className="flex flex-col group-odd:order-2">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
            <feature.icon className="text-white h-10 w-10"/>
        </div>
          <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
          <p>
            {feature.description}
          </p>
          </div>
          <div className="relative">
            <Image src="/placehoder.svg" fill alt={feature.title} />
          </div>
        </section>
      ))}
    </div>
  );
}