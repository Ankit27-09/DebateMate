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
			<meshStandardMaterial
				color="#4F46E5"
				metalness={0.5}
				roughness={0.2}
			/>
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
				  className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-b from-background to-muted"
				>
				  {/* Background Effects */}
				  <div className="absolute inset-0 z-0">
				    <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
				    <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-indigo-400/20 blur-2xl animate-bounce" />
				    <div className="absolute -bottom-40 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-spin-slow" />
				  </div>

				  <div className="container mx-auto px-4 z-10">
				    <motion.div
				      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
				      initial="hidden"
				      animate={heroControls}
				      variants={staggerContainer}
				      style={{ y: heroY, opacity: heroOpacity }}
				    >
				      {/* Left: Text Content */}
				      <motion.div className="space-y-6 lg:space-y-8" variants={fadeInUp}>
				        <motion.div
				          className="inline-block px-4 py-2 bg-muted text-primary font-medium text-sm rounded-full shadow"
				          initial={{ opacity: 0, x: -20 }}
				          animate={{ opacity: 1, x: 0 }}
				          transition={{ delay: 0.2, duration: 0.5 }}
				        >
				          🚀 The Future of Debate Training
				        </motion.div>

				        <motion.h1
				          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-tight"
				          variants={fadeInUp}
				        >
				          <span className="block">DebateMate</span>
				          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
				            Elevate Your Argument Game
				          </span>
				        </motion.h1>

				        <motion.p
				          className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
				          variants={fadeInUp}
				        >
				          1-on-1 AI-driven debates with real-time feedback. Master the art of persuasion and critical thinking.
				        </motion.p>

				        <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
				          <Link
				            href="/pricing"
				            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-lg rounded-xl shadow-md hover:bg-primary/90 hover:shadow-xl transition-transform hover:scale-105 active:scale-95"
				          >
				            Start Your First Debate
				            <ArrowRight className="ml-2 h-5 w-5" />
				          </Link>

				          <Button
				            variant="outline"
				            size="lg"
				            className="border-2 border-primary text-primary hover:bg-primary/10 rounded-xl px-8 py-4 text-lg shadow hover:shadow-md transition-transform hover:scale-105"
				          >
				            Watch Demo
				          </Button>
				        </motion.div>

				        <motion.div className="flex items-center gap-3 text-muted-foreground mt-4" variants={fadeInUp}>
				          <div className="flex -space-x-2">
				            {[1, 2, 3, 4].map((i) => (
				              <div
				                key={i}
				                className="w-8 h-8 rounded-full bg-gradient-to-r from-chart-1 to-chart-5 border-2 border-background"
				              />
				            ))}
				          </div>
				          <span>
				            Join <strong>2,000+</strong> debaters worldwide
				          </span>
				        </motion.div>
				      </motion.div>

				      {/* Right: 3D Visual */}
				      <motion.div
				        className="relative h-[400px] md:h-[500px] lg:h-[600px] border-4 border-muted rounded-3xl overflow-hidden shadow-2xl"
				        initial={{ opacity: 0, x: 100 }}
				        animate={{ opacity: 1, x: 0 }}
				        transition={{ duration: 0.8, delay: 0.4 }}
				      >
				        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-10 blur-2xl rotate-3" />
				        <div className="absolute inset-0 bg-card rounded-3xl overflow-hidden">
				          <div className="absolute top-0 left-0 right-0 h-12 bg-muted flex items-center px-4 border-b">
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

				  {/* Scroll Indicator */}
				  <motion.div
				    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
				    initial={{ opacity: 0, y: -20 }}
				    animate={{ opacity: 1, y: 0 }}
				    transition={{
				      delay: 1,
				      duration: 1,
				      repeat: Infinity,
				      repeatType: "reverse",
				    }}
				  >
				    <div className="w-8 h-12 rounded-full border-2 border-muted-foreground flex justify-center items-start">
				      <motion.div
				        className="h-3 w-3 bg-muted-foreground rounded-full mt-2"
				        animate={{ y: [0, 6, 0] }}
				        transition={{ duration: 1.5, repeat: Infinity }}
				      />
				    </div>
				  </motion.div>
				</section>







				{/* Logo Marquee */}
				<LogoMarquee />

				{/* Features Section */}
				<FeaturesSection />

				{/* How It Works Section */}
				<section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
					<div className="container mx-auto px-4">
						<motion.div
							className="text-center max-w-3xl mx-auto mb-16"
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true, amount: 0.3 }}
						>
							<div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-800 dark:text-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-4">
								Simple Process
							</div>
							<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
								How DebateMate Works
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-300">
								Our platform makes it easy to practice, learn, and improve your debate skills
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
							{[
								{
									step: "01",
									title: "Choose a Topic",
									description:
										"Select from our library of debate topics or create your own custom topic.",
								},
								{
									step: "02",
									title: "Debate the AI",
									description:
										"Engage in a real-time debate with our advanced AI opponent that adapts to your style.",
								},
								{
									step: "03",
									title: "Get Feedback",
									description:
										"Receive detailed analysis and personalized tips to improve your performance.",
								},
							].map((item, index) => (
								<motion.div
									key={index}
									className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-colors duration-300"
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true, amount: 0.3 }}
								>
									<div className="absolute -top-6 left-8 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
										{item.step}
									</div>
									<h3 className="text-2xl font-bold mt-6 mb-4 text-gray-900 dark:text-white">
										{item.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-300">{item.description}</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>


				{/* Stats Section */}
				<section
					ref={statsRef}
					className="py-24 bg-indigo-900 dark:bg-indigo-700 text-primary-foreground dark:text-primary"
				>
					<div className="container mx-auto px-4">
						<motion.div
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
							initial="hidden"
							animate={statsControls}
							variants={staggerContainer}
						>
							{[
								{ number: "10,000+", label: "Active Users" },
								{
									number: "500,000+",
									label: "Debates Completed",
								},
								{ number: "92%", label: "Improvement Rate" },
								{ number: "4.9/5", label: "User Rating" },
							].map((stat, index) => (
								<motion.div
									key={index}
									className="p-8"
									variants={fadeInUp}
								>
									<div className="text-4xl md:text-5xl font-bold mb-2">
										{stat.number}
									</div>
									<div className="text-primary-foreground/80 dark:text-primary/75">
										{stat.label}
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>

				{/* Testimonials Section */}
				<TestimonialsSection />

				{/* Pricing Section */}
				<PricingSection />

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
								Join thousands of users who have transformed
								their argumentation abilities with DebateMate.
							</p>

							<Link href="/pricing" passHref>
							  <MotionButton
							    asChild
							    size="lg"
							    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-4 text-lg shadow-md hover:shadow-lg transition-transform"
							    whileHover={{ scale: 1.05 }}
							    whileTap={{ scale: 0.98 }}
							  >
							    <span className="flex items-center">
							      Start Your First Debate
							      <ArrowRight className="ml-2 h-5 w-5" />
							    </span>
							  </MotionButton>
							</Link>

						</motion.div>
					</div>
				</section>
			</main>
		</>
	);
}