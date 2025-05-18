"use client";

import LogoMarquee from "@/components/logo-marquee";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FeaturesPage from "./features/page";
import PricingPage from "./pricing/page";
import TestimonialsPage from "./testimonials/page";
import HowItWorksPage from "./works/page";

function AvatarModel() {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4F46E5" metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

export default function Home() {
  const isMobile = useMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  const router = useRouter();

  const MotionButton = motion(Button);

  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialRef = useRef(null);
  const pricingRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const testimonialInView = useInView(testimonialRef, {
    once: true,
    amount: 0.3,
  });
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.3 });

  const heroControls = useAnimation();
  const statsControls = useAnimation();
  const testimonialControls = useAnimation();
  const pricingControls = useAnimation();

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    setIsLoaded(true);

    if (heroInView) heroControls.start("visible");
    if (statsInView) statsControls.start("visible");
    if (testimonialInView) testimonialControls.start("visible");
    if (pricingInView) pricingControls.start("visible");
  }, [
    heroInView,
    statsInView,
    testimonialInView,
    pricingInView,
    heroControls,
    statsControls,
    testimonialControls,
    pricingControls,
  ]);

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
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        {/* Hero Section with Gradient Background */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden dark:bg-gray-900"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 z-0" />

          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-100 opacity-60" />
            <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-teal-100 opacity-60" />
            <div className="absolute -bottom-40 right-1/4 w-80 h-80 rounded-full bg-indigo-200 opacity-40" />
          </div>

          <div className="container mx-auto px-4 z-10">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial="hidden"
              animate={heroControls}
              variants={staggerContainer}
              style={{ y: heroY, opacity: heroOpacity }}
            >
              <motion.div className="space-y-8" variants={fadeInUp}>
                <motion.div
                  className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  🚀 The Future of Debate Training
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white"
                  variants={fadeInUp}
                >
                  <span className="block">DebateMate:</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500">
                    Elevate Your Argument Game
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-700 max-w-xl dark:text-gray-400"
                  variants={fadeInUp}
                >
                  1-on-1 AI-driven debates with real-time feedback. Master the
                  art of persuasion and critical thinking.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  variants={fadeInUp}
                >
                  <MotionButton
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 py-6 text-lg shadow-lg hover:shadow-indigo-200 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Your First Debate
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </MotionButton>

                  <MotionButton
                    variant="outline"
                    size="lg"
                    className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl px-8 py-6 text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    See Demo
                  </MotionButton>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 text-gray-600 dark:text-gray-500"
                  variants={fadeInUp}
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span>
                    Join <b>2,000+</b> debaters worldwide
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative h-[500px] lg:h-[600px]"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-3xl transform rotate-3 opacity-20" />
                <div className="absolute inset-0 bg-white dark:bg-gray-700 rounded-3xl shadow-xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-12 dark:bg-gray-800 bg-gray-50 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                  </div>

                  <div className="pt-12 h-full">
                    <Canvas>
                      <ambientLight intensity={0.8} />
                      <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={1}
                      />
                      <pointLight position={[-10, -10, -10]} />
                      <AvatarModel />
                      <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={1}
                      />
                    </Canvas>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
          }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex justify-center items-start pt-2 dark:border-gray-500">
            <motion.div
          className="text-gray-400 text-2xl font-bold dark:text-gray-500"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down-icon lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </motion.div>
          </div>
        </motion.div>
        </section>  

        {/* Logo Marquee */}
        <LogoMarquee />

        {/* Features Section */}
        <FeaturesPage />

        {/* How It Works Section */}
        <HowItWorksPage/>

        {/* Stats Section */}
        <section ref={statsRef} className="py-24 bg-indigo-900 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
              initial="hidden"
              animate={statsControls}
              variants={staggerContainer}
            >
              {[
                { number: "10,000+", label: "Active Users" },
                { number: "500,000+", label: "Debates Completed" },
                { number: "92%", label: "Improvement Rate" },
                { number: "4.9/5", label: "User Rating" },
              ].map((stat, index) => (
                <motion.div key={index} className="p-8" variants={fadeInUp}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-indigo-200">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsPage />

        {/* Pricing Section */}
        <PricingPage />

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to elevate your debate skills?
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Join thousands of users who have transformed their argumentation
                abilities with DebateMate.
              </p>

              <MotionButton
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl px-8 py-6 text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </MotionButton>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
