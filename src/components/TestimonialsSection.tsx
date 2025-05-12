"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import TestimonialCarousel from "@/components/testimonial-carousel"
import Navbar from "./Navbar"


 
export default function TestimonialsSection() {
  
    const testimonialRef = useRef(null)
    const testimonialInView = useInView(testimonialRef, { once: true, amount: 0.3 })
    const testimonialControls = useAnimation()
  
    useEffect(() => {
        if (testimonialInView) testimonialControls.start("visible")
      }, [
        
        testimonialInView,
        testimonialControls
      ])
    
      const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }
    
      const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }
  return (
    <section ref={testimonialRef} className="py-24 bg-white">
        <Navbar />
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              animate={testimonialControls}
              variants={staggerContainer}
            >
              <motion.div
                className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-4"
                variants={fadeInUp}
              >
                Testimonials
              </motion.div>
              <motion.h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" variants={fadeInUp}>
                What Our Users Say
              </motion.h2>
              <motion.p className="text-xl text-gray-600" variants={fadeInUp}>
                Join thousands of satisfied debaters who have transformed their skills with DebateMate
              </motion.p>
            </motion.div>

            <TestimonialCarousel />
          </div>
        </section>
    )
}
