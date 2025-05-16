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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size on initial load
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // build the array here so it doesn't change identity each render
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
    <div className="w-full lg:w-full">
      <nav className="sticky top-16 z-40 bg-muted w-full border-b border-gray-400 p-2">
        <div className="flex flex-wrap max-w-screen-xl mx-auto justify-between">
          {features.map((feature, i) => {
            const isActive = activeIndex === i;
            return (
              <Button
                key={feature.gradient}
                onClick={() => handleClick(i)}
                variant="outline"
                className={cn(
                  "relative py-1 px-1 sm:px-2 font-normal cursor-pointer text-center text-xs sm:text-sm",
                  "w-[48%] sm:w-auto mb-2 sm:mb-0",
                  isActive && "text-background font-bold hover:text-background"
                )}
              >
                <span className="relative z-10 truncate">{feature.title}</span>
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
        </div>
      </nav>

      {features.map((feature, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={feature.gradient}
            id={feature.gradient}
            ref={sectionRefs[i]}
            className="py-8 bg-muted border-b scroll-mt-16"
          >
            <div className="container max-w-screen-xl mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                <div 
                  className={cn(
                    "w-full md:w-1/2 h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden",
                    "order-2 md:order-none mt-4 md:mt-0",
                    { "md:order-1": isEven, "md:order-2": !isEven }
                  )}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div 
                  className={cn(
                    "w-full md:w-1/2",
                    "order-1 md:order-none",
                    { "md:order-2": isEven, "md:order-1": !isEven }
                  )}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-3`}
                  >
                    <feature.icon className="text-white h-6 w-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">{feature.title}</h2>
                  <p className="text-sm sm:text-base">{feature.description}</p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}