"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Debate Team Captain, Stanford University",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "DebateMate transformed our team's performance. The AI opponent provides realistic practice scenarios, and the detailed feedback helped us identify and fix weaknesses in our arguments.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "High School Debate Coach",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "I've been coaching debate for 15 years, and DebateMate is the most innovative tool I've seen. My students have shown remarkable improvement in their critical thinking and rebuttal skills.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Law Student",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "As a law student, articulating clear arguments is essential. DebateMate helped me refine my reasoning and anticipate counterarguments, which has been invaluable in moot court competitions.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Okafor",
    role: "Public Speaking Coach",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The personalized roadmap feature is exceptional. It identified specific areas where my clients needed improvement and provided targeted exercises that yielded noticeable results.",
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const isMobile = useMobile()

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  const displayCount = isMobile ? 1 : 2

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`grid grid-cols-1 ${displayCount > 1 ? "md:grid-cols-2" : ""} gap-8`}
          >
            {Array.from({ length: displayCount }).map((_, i) => {
              const testimonialIndex = (currentIndex + i) % testimonials.length
              const testimonial = testimonials[testimonialIndex]

              return (
                <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 bg-indigo-100">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 italic">{testimonial.content}</p>

                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-indigo-600" : "bg-gray-300"}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full w-10 h-10 bg-white shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50 z-10"
        onClick={prevTestimonial}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full w-10 h-10 bg-white shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50 z-10"
        onClick={nextTestimonial}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
