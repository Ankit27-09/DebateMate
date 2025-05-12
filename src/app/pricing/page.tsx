"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
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
    <main className="min-h-screen bg-white py-10">
      <div ref={pricingRef} className="py-2 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            animate={pricingControls}
            variants={staggerContainer}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-1xl mb-4"
              variants={fadeInUp}
            >
              Pricing Plans
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              variants={fadeInUp}
            >
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
                  plan.popular ? "border-indigo-600" : "border-transparent"
                )}
                variants={fadeInUp}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
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
                <motion.button
                  className={cn(
                    "w-full py-6 rounded-xl",
                    plan.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  )}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.buttonText}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
