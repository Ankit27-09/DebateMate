"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import FAQItem from "@/components/ui/faq_item";

interface FAQData {
    id: string;
    question: string;
    answer: string;
    icon: string;
}

interface FAQSectionProps {
    title?: string;
    subtitle?: string;
    faqData: FAQData[];
    className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
    title = "Frequently Asked Questions",
    subtitle = "Find answers to common questions about our platform.",
    faqData,
    className = ""
}) => {
    const [openFAQ, setOpenFAQ] = useState<string | null>(null);

    const toggleFAQ = (id: string) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    // Animation variants
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
        <section className={`py-20 bg-background px-8 sm:px-0 ${className}`}>
            <div className="container mx-auto w-full">
                <div className="max-w-3xl mx-auto">
                    <motion.h2
                        className="text-3xl font-bold mb-4 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {title}
                    </motion.h2>

                    <motion.p
                        className="text-muted-foreground text-center mb-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {subtitle}
                    </motion.p>

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