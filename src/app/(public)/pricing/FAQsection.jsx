"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import FAQItem from "../../../components/ui/faq_item";

const FAQSection = () => {
  const faqData = [
  {
    id: 1,
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit toward your next billing cycle.",
    icon: "FaExchangeAlt"
  },
  {
    id: 2,
    question: "Is there a free trial?",
    answer: "Yes, all plans come with a 14-day free trial. No credit card required to start.",
    icon: "FaClock"
  },
  {
    id: 3,
    question: "Do you offer discounts for educational institutions?",
    answer: "Yes, we offer special pricing for schools and universities. Contact our sales team for more information.",
    icon: "FaGraduationCap"
  },
  {
    id: 4,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
    icon: "FaCreditCard"
  },
  {
    id: 5,
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.",
    icon: "FaRegCalendarTimes"
  }
];
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for each FAQ item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-background px-8 sm:px-0">
      <div className="container mx-auto w-full">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {faqData.map((faq) => (
              <motion.div key={faq.id} variants={itemVariants}>
                <FAQItem
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  icon={faq.icon}
                  isOpen={openFAQ === faq.id}
                  toggleFAQ={toggleFAQ}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
