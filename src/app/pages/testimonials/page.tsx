"use client"

import { useEffect, useRef} from "react"
import { motion, useAnimation, useInView} from "framer-motion"

import TestimonialCarousel from "@/components/testimonial-carousel"
import Navbar from "@/components/Navbar"

function AvatarModel() {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4F46E5" metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

export default function TestimonialsPage(){
    
      
      const heroRef = useRef(null)
      const featuresRef = useRef(null)
      const statsRef = useRef(null)
      const testimonialRef = useRef(null)
      const pricingRef = useRef(null)
    
      const heroInView = useInView(heroRef, { once: true })
      const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })
      const statsInView = useInView(statsRef, { once: true, amount: 0.3 })
      const testimonialInView = useInView(testimonialRef, { once: true, amount: 0.3 })
      const pricingInView = useInView(pricingRef, { once: true, amount: 0.3 })
    
      const heroControls = useAnimation()
      const featuresControls = useAnimation()
      const statsControls = useAnimation()
      const testimonialControls = useAnimation()
      const pricingControls = useAnimation()
    
    
      useEffect(() => {
    
        if (heroInView) heroControls.start("visible")
        if (featuresInView) featuresControls.start("visible")
        if (statsInView) statsControls.start("visible")
        if (testimonialInView) testimonialControls.start("visible")
        if (pricingInView) pricingControls.start("visible")
      }, [
        heroInView,
        featuresInView,
        statsInView,
        testimonialInView,
        pricingInView,
        heroControls,
        featuresControls,
        statsControls,
        testimonialControls,
        pricingControls,
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
        <main className="min-h-screen bg-white py-10">
            <Navbar />
             <div ref={testimonialRef} className=" bg-white">
                      <div className="container mx-auto px-4">
                        <motion.div
                          className="text-center max-w-3xl mx-auto mb-16"
                          initial="hidden"
                          animate={testimonialControls}
                          variants={staggerContainer}
                        >
                          <motion.div
                            className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-1xl mb-4"
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
            </div>
        </main>
    )
}