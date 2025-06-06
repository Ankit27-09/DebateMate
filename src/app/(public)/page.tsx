"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import LogoMarquee from "@/components/logo-marquee";
import FeaturesSection from "@/components/landing/features-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import PricingSection from "@/components/landing/pricing-section";
import Navbar from "@/components/navbar";
import Link from "next/link";

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
  const testimonialInView = useInView(testimonialRef, { once: true, amount: 0.3 });
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.3 });

  const heroControls = useAnimation();
  const statsControls = useAnimation();
  const testimonialControls = useAnimation();
  const pricingControls = useAnimation();

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
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-indigo-50 z-0" />
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
                <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900" variants={fadeInUp}>
                  <span className="block">DebateMate:</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500">
                    Elevate Your Argument Game
                  </span>
                </motion.h1>
                <motion.p className="text-xl md:text-2xl text-gray-700 max-w-xl" variants={fadeInUp}>
                  1-on-1 AI-driven debates with real-time feedback. Master the art of persuasion and critical thinking.
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                    <Link href="/debate/options">Start Your First Debate</Link>
                  </Button>
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
                <motion.div className="flex items-center gap-4 text-gray-600" variants={fadeInUp}>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span>Join <b>2,000+</b> debaters worldwide</span>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative h-[500px] lg:h-[600px]"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-3xl transform rotate-3 opacity-20" />
                <div className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-12 bg-gray-50 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                  </div>
                  <div className="pt-12 h-full">
                    <Canvas>
                      <ambientLight intensity={0.8} />
                      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                      <pointLight position={[-10, -10, -10]} />
                      <AvatarModel />
                      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                    </Canvas>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        </section>

        {/* Remaining sections */}
        <LogoMarquee />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <Footer />
      </main>
    </>
  );
}
