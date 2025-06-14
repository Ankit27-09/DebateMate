"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ShieldCheck,
  RefreshCw,
  GraduationCap,
  CreditCard,
  XCircle,
} from "lucide-react";

const faqs = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit toward your next billing cycle.",
    icon: RefreshCw,
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all plans come with a 14-day free trial. No credit card required to start.",
    icon: ShieldCheck,
  },
  {
    question: "Do you offer discounts for educational institutions?",
    answer:
      "Yes, we offer special pricing for schools and universities. Contact our sales team for more information.",
    icon: GraduationCap,
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
    icon: CreditCard,
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.",
    icon: XCircle,
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-[600px] overflow-hidden border-b border-border bg-background py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background via-background/50 to-primary/10 opacity-50"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className="relative z-10 text-center"
      >
        <h2 className="mt-10 text-3xl md:text-4xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground md:text-xl mx-auto mt-6 max-w-3xl px-4 text-lg">
          Got questions? We&apos;ve got answers.
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto mt-16 max-w-4xl px-6">
        {faqs.map((faq, index) => {
          const IconComponent = faq.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: false }}
              className="group mb-4"
            >
              <div
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex cursor-pointer items-center justify-between rounded-md border border-border/50 
                  bg-card/80 p-4 transition-all 
                  duration-300 hover:bg-card/90 
                  group-hover:border-primary/30 group-hover:shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`rounded-full p-2 transition-colors duration-300 
                    ${
                      openIndex === index
                        ? "bg-primary/20 text-primary"
                        : "bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`h-6 w-6 transform text-muted-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      transition: {
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.3, delay: 0.1 },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: {
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      className="rounded-b-md border-x border-b border-border/50 
                      bg-card/60 p-4 text-muted-foreground 
                      shadow-sm backdrop-blur-sm"
                      initial={{ y: 10 }}
                      animate={{ y: 0 }}
                      exit={{ y: 10 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
