"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const MotionButton = motion.create(Button);

const plans = [
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
  },
  {
    name: "Pro",
    price: "$29",
    description: "Most popular choice",
    features: [
      "Unlimited AI debates",
      "Advanced analytics dashboard",
      "Personalized improvement roadmap",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Team",
    price: "$99",
    description: "For debate teams & clubs",
    features: [
      "Everything in Pro plan",
      "Up to 10 team members",
      "Team analytics & leaderboard",
      "Dedicated account manager",
    ],
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that best fits your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative bg-background rounded-xl p-8 shadow-sm border-2 transition-all duration-300 ${
                plan.popular 
                  ? "border-indigo-600 hover:shadow-lg hover:shadow-indigo-100" 
                  : "border-transparent hover:border-indigo-200 hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium"
                >
                  Most Popular
                </motion.div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <MotionButton
                className={`w-full py-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  plan.popular
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                Get Started
              </MotionButton>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <MotionButton asChild variant="outline" size="lg">
            <Link href="/pricing">
              View Detailed Pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </MotionButton>
        </motion.div>
      </div>
    </section>
  );
} 