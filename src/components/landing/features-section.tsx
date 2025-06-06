"use client";

import { Shield, Brain, Lightbulb, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionButton = motion.create(Button);

const features = [
  {
    title: "Secure Authentication",
    description: "Protect your data with our robust authentication system.",
    icon: Shield,
    gradient: "from-indigo-500 to-indigo-700",
  },
  {
    title: "Personalized AI Training",
    description: "Get customized feedback and training exercises based on your skill level.",
    icon: Brain,
    gradient: "from-teal-500 to-teal-700",
  },
  {
    title: "Gemini-powered Learning",
    description: "Follow structured learning paths designed by debate experts.",
    icon: Lightbulb,
    gradient: "from-purple-500 to-purple-700",
  },
  {
    title: "Real-time Feedback",
    description: "Receive instant analysis on your arguments and delivery.",
    icon: MessageSquare,
    gradient: "from-blue-500 to-blue-700",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to excel in debate competitions
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}
              >
                <feature.icon className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
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
            <Link href="/features">
              View All Features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </MotionButton>
        </motion.div>
      </div>
    </section>
  );
} 