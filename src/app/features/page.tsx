"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { Brain, FileText, Map, Upload } from "lucide-react";

import { fadeInUp, staggerContainer } from "@/utils/animations/variants";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variants: any;
  gradient: string;
}

function FeatureCard({
  icon,
  title,
  description,
  variants,
  gradient,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all"
    >
      <div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

export default function FeaturesPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialRef = useRef(null);
  const pricingRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const testimonialInView = useInView(testimonialRef, {
    once: true,
    amount: 0.3,
  });
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.3 });

  const heroControls = useAnimation();
  const featuresControls = useAnimation();
  const statsControls = useAnimation();
  const testimonialControls = useAnimation();
  const pricingControls = useAnimation();

  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    if (featuresInView) featuresControls.start("visible");
    if (statsInView) statsControls.start("visible");
    if (testimonialInView) testimonialControls.start("visible");
    if (pricingInView) pricingControls.start("visible");
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
  ]);

  return (
    <main className="min-h-screen bg-white py-10">
      <div ref={featuresRef} className=" bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            animate={featuresControls}
            variants={staggerContainer}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-1xl mb-4 mt-8 md:mt-5 lg:mt-6"
              variants={fadeInUp}
            >
              Powerful Features
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              variants={fadeInUp}
            >
              Everything you need to become a master debater
            </motion.h2>
            <motion.p className="text-xl text-gray-600" variants={fadeInUp}>
              Our platform combines cutting-edge AI technology with proven
              debate techniques to help you improve faster than ever before.
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
      </div>
    </main>
  );
}
