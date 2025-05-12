// components/FeaturesSection.tsx
"use client";
import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useAnimation } from 'framer-motion';

import { motion } from 'framer-motion';
import { Brain, FileText, Map, Upload } from 'lucide-react';
import FeatureCard from './FeatureCard';
import Navbar from './Navbar';

export default function FeaturesSection() {
    const featuresRef = useRef(null)
    const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })
    const featuresControls = useAnimation()

     useEffect(() => {    
        if (featuresInView) featuresControls.start("visible")
        
      }, [
        featuresInView,
       
        featuresControls,
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
    <section ref={featuresRef} className="py-24 bg-white">
        <Navbar />
              <div className="container mx-auto px-4">
                <motion.div
                  className="text-center max-w-3xl mx-auto mb-16"
                  initial="hidden"
                  animate={featuresControls}
                  variants={staggerContainer}
                >
                  <motion.div
                    className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-4"
                    variants={fadeInUp}
                  >
                    Powerful Features
                  </motion.div>
                  <motion.h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" variants={fadeInUp}>
                    Everything you need to become a master debater
                  </motion.h2>
                  <motion.p className="text-xl text-gray-600" variants={fadeInUp}>
                    Our platform combines cutting-edge AI technology with proven debate techniques to help you improve
                    faster than ever before.
                  </motion.p>
                </motion.div>
    
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                  initial="hidden"
                  animate={featuresControls}
                  variants={staggerContainer}
                >
                  <FeatureCard
                    icon={<Brain className="h-10 w-10 text-white" />}
                    title="AI Opponent"
                    description="Practice with our advanced AI that adapts to your skill level and debate style."
                    variants={fadeInUp}
                    gradient="from-indigo-500 to-indigo-700"
                  />
    
                  <FeatureCard
                    icon={<FileText className="h-10 w-10 text-white" />}
                    title="Deep Reports"
                    description="Get comprehensive analysis of your arguments, logical fallacies, and persuasion techniques."
                    variants={fadeInUp}
                    gradient="from-teal-500 to-teal-700"
                  />
    
                  <FeatureCard
                    icon={<Map className="h-10 w-10 text-white" />}
                    title="Personalized Roadmaps"
                    description="Follow a custom learning path based on your strengths and areas for improvement."
                    variants={fadeInUp}
                    gradient="from-purple-500 to-purple-700"
                  />
    
                  <FeatureCard
                    icon={<Upload className="h-10 w-10 text-white" />}
                    title="Upload & Analyze"
                    description="Upload recordings of your real debates for AI-powered feedback and suggestions."
                    variants={fadeInUp}
                    gradient="from-blue-500 to-blue-700"
                  />
                </motion.div>
              </div>
            </section>
  );
}
