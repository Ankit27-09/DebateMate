"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView, useScroll, useTransform, HTMLMotionProps } from "framer-motion"
import { ArrowRight, Brain, CheckCircle, FileText, Map, Upload } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

import Footer from "@/components/footer"
import TestimonialCarousel from "@/components/testimonial-carousel"
import LogoMarquee from "@/components/logo-marquee"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar"

const MotionButton = motion(Button)

function AvatarModel() {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4F46E5" metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

export default function Home() {
  const isMobile = useMobile()
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll()

  
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

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    setIsLoaded(true)

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
    <>

      <main className="overflow-hidden">
        {/* Hero Section with Gradient Background */}
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-indigo-50 z-0" />

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
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900"
                  variants={fadeInUp}
                >
                  <span className="block">DebateMate:</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500">
                    Elevate Your Argument Game
                  </span>
                </motion.h1>

                <motion.p className="text-xl md:text-2xl text-gray-700 max-w-xl" variants={fadeInUp}>
                  1-on-1 AI-driven debates with real-time feedback. Master the art of persuasion and critical thinking.
                </motion.p>

                <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
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

                <motion.div className="flex items-center gap-4 text-gray-600" variants={fadeInUp}>
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

          {/* Scroll indicator */}
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

        {/* Logo Marquee */}
        <LogoMarquee />

        {/* Features Section */}
        <section ref={featuresRef} className="py-24 bg-white">
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

        {/* How It Works Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-4">
                Simple Process
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">How DebateMate Works</h2>
              <p className="text-xl text-gray-600">
                Our platform makes it easy to practice, learn, and improve your debate skills
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Choose a Topic",
                  description: "Select from our library of debate topics or create your own custom topic.",
                },
                {
                  step: "02",
                  title: "Debate the AI",
                  description: "Engage in a real-time debate with our advanced AI opponent that adapts to your style.",
                },
                {
                  step: "03",
                  title: "Get Feedback",
                  description: "Receive detailed analysis and personalized tips to improve your performance.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white rounded-2xl p-8 shadow-lg"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mt-6 mb-4 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-indigo-200">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={testimonialRef} className="py-24 bg-white">
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

        {/* Pricing Section */}
        <section ref={pricingRef} className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              animate={pricingControls}
              variants={staggerContainer}
            >
              <motion.div
                className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-4"
                variants={fadeInUp}
              >
                Pricing Plans
              </motion.div>
              <motion.h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" variants={fadeInUp}>
                Choose Your Plan
              </motion.h2>
              <motion.p className="text-xl text-gray-600" variants={fadeInUp}>
                Flexible options to suit your needs and budget
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              initial="hidden"
              animate={pricingControls}
              variants={staggerContainer}
            >
              {[
                {
                  name: "Starter",
                  price: "$9",
                  description: "Perfect for beginners",
                  features: [
                    "5 AI debates per month",
                    "Basic performance analytics",
                    "Access to debate topics library",
                    "Email support",
                  ],
                  popular: false,
                  buttonText: "Get Started",
                },
                {
                  name: "Pro",
                  price: "$29",
                  description: "Most popular choice",
                  features: [
                    "Unlimited AI debates",
                    "Advanced analytics dashboard",
                    "Personalized improvement roadmap",
                    "Upload & analyze your debates",
                    "Priority support",
                  ],
                  popular: true,
                  buttonText: "Get Started",
                },
                {
                  name: "Team",
                  price: "$99",
                  description: "For debate teams & clubs",
                  features: [
                    "Everything in Pro plan",
                    "Up to 10 team members",
                    "Team analytics & leaderboard",
                    "Custom debate topics",
                    "Dedicated account manager",
                  ],
                  popular: false,
                  buttonText: "Contact Sales",
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "relative bg-white rounded-2xl p-8 shadow-lg border-2",
                    plan.popular ? "border-indigo-600" : "border-transparent",
                  )}
                  variants={fadeInUp}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <MotionButton
                    className={cn(
                      "w-full py-6 rounded-xl",
                      plan.popular
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
                    )}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.buttonText}
                  </MotionButton>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to elevate your debate skills?</h2>
              <p className="text-xl text-indigo-100 mb-8">
                Join thousands of users who have transformed their argumentation abilities with DebateMate.
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

      <Footer />
    </>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  variants: any
  gradient: string
}

function FeatureCard({ icon, title, description, variants, gradient }: FeatureCardProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}
