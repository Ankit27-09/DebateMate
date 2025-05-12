"use client";
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Shield, Brain, Lightbulb, MessageSquare } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Secure Authentication",
    description:
      "Protect your data with our robust authentication system. Your debate progress and personal information stay private.",
    icon: Shield,

    gradient: "from-indigo-500 to-indigo-700",
    image: "https://picsum.photos/seed/Secure_Authentication/800/400",
  },
  {
    title: "Personalized AI Training",
    description:
      "Get customized feedback and training exercises based on your skill level, debate style, and areas for improvement.",
    icon: Brain,

    gradient: "from-teal-500 to-teal-700",
    image: "https://picsum.photos/seed/Personalized_AI_Training/800/400",
  },
  {
    title: "Gemini-powered Learning Paths",
    description:
      "Follow structured learning paths designed by debate experts and optimized by AI to accelerate your progress.",
    icon: Lightbulb,

    gradient: "from-purple-500 to-purple-700",
    image: "https://picsum.photos/seed/Gemini-powered Learning Paths/800/400",
  },
  {
    title: "Real-time Feedback",
    description:
      "Receive instant analysis on your arguments, delivery, and persuasiveness during practice sessions.",
    icon: MessageSquare,

    gradient: "from-blue-500 to-blue-700",
    image: "https://picsum.photos/seed/Real-time_Feedback/800/400",
  },
];
export default function Features() {
  // Create refs and inView hooks for each of the 4 features
  const sectionRef0 = useRef<HTMLDivElement>(null);
  const sectionRef1 = useRef<HTMLDivElement>(null);
  const sectionRef2 = useRef<HTMLDivElement>(null);
  const sectionRef3 = useRef<HTMLDivElement>(null);

  const inView0 = useInView(sectionRef0, { amount: 0.2 });
  const inView1 = useInView(sectionRef1, { amount: 0.2 });
  const inView2 = useInView(sectionRef2, { amount: 0.2 });
  const inView3 = useInView(sectionRef3, { amount: 0.2 });

  const sectionRefs = [sectionRef0, sectionRef1, sectionRef2, sectionRef3];

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    // build the array here so it doesn’t change identity each render
    const inViews = [inView0, inView1, inView2, inView3];
    const foundIndex = inViews.findIndex(Boolean);
    if (foundIndex !== -1) {
      setActiveIndex((prev) => {
        if (prev === foundIndex) return prev;
        setDirection(foundIndex > prev ? 1 : -1);
        return foundIndex;
      });
    }
    // only re-run when one of the boolean flags changes
  }, [inView0, inView1, inView2, inView3]);

  const handleClick = (index: number) => {
    sectionRefs[index].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <nav className="sticky top-16 z-40 bg-background w-full flex justify-around border-b border-gray-400 p-3">
        {features.map((feature, i) => {
          const isActive = activeIndex === i;
          return (
            <Button
              key={feature.gradient}
              onClick={() => handleClick(i)}
              variant="outline"
              className={cn(
                "relative py-1 basis-1/5 px-2 font-normal cursor-pointer text-center",
                isActive && "text-background font-bold hover:text-background"
              )}
            >
              <span className="relative z-10">{feature.title}</span>
              <AnimatePresence mode="wait">
                {activeIndex === i && (
                  <motion.div
                    initial={
                      direction === 1
                        ? { left: 0, right: "100%" }
                        : { left: "100%", right: 0 }
                    }
                    animate={{ left: 0, right: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 600,
                      damping: 100,
                    }}
                    exit={
                      direction === 1
                        ? { left: "100%", right: 0 }
                        : { left: 0, right: "100%" }
                    }
                    className="absolute inset-0 bg-indigo-400 rounded-lg z-0"
                  />
                )}
              </AnimatePresence>
            </Button>
          );
        })}
      </nav>

      {features.map((feature, i) => (
        <section
          key={feature.gradient}
          id={feature.gradient}
          ref={sectionRefs[i]}
          className="min-h-[80vh] px-12 p-8 group bg-background container border-b scroll-mt-16 grid grid-cols-2 gap-8 h-full w-full justify-center items-center"
        >
          <div className="flex flex-col group-odd:order-2">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}
            >
              <feature.icon className="text-white h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
          <div className="relative h-full w-full rounded-2xl overflow-hidden group-odd:order-1">
            <Image
              src={feature.image}
              className="object-cover"
              fill
              alt={feature.title}
            />
          </div>
        </section>
      ))}
    </div>
  );
}
