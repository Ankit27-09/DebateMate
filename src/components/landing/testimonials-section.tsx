"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Debate Team Captain, Stanford University",
    content:
      "DebateMate transformed our team's performance. The AI opponent provides realistic practice scenarios, and the detailed feedback helped us identify and fix weaknesses in our arguments.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "High School Debate Coach",
    content:
      "I've been coaching debate for 15 years, and DebateMate is the most innovative tool I've seen. My students have shown remarkable improvement in their critical thinking and rebuttal skills.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Law Student",
    content:
      "As a law student, articulating clear arguments is essential. DebateMate helped me refine my reasoning and anticipate counterarguments, which has been invaluable in moot court competitions.",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Small delay to ensure smooth transition
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 100);

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied users who have transformed their debate
            skills
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={mounted ? "interactive" : "static"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: mounted
                    ? `translateX(-${currentIndex * 100}%)`
                    : "none",
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-muted rounded-xl p-8 shadow-sm border">
                      <div className="flex mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic text-lg">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div>
                        <p className="font-semibold text-lg">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center gap-2 mt-8"
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index ? "bg-indigo-600 w-4" : "bg-gray-300"
                  }`}
                />
              ))}
            </motion.div>
          )}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/testimonials">
              Read More Success Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
