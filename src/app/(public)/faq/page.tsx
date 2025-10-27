"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import FAQItem from "@/components/ui/faq_item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HelpCircle, MessageSquare, BookOpen, Users, Shield, CreditCard } from "lucide-react";

const FAQPage = () => {
    const [openFAQ, setOpenFAQ] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState("general");

    const toggleFAQ = (id: string) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    const faqCategories = [
        { id: "general", label: "General", icon: HelpCircle },
        { id: "debates", label: "Debates", icon: MessageSquare },
        { id: "learning", label: "Learning", icon: BookOpen },
        { id: "community", label: "Community", icon: Users },
        { id: "privacy", label: "Privacy & Security", icon: Shield },
        { id: "billing", label: "Billing", icon: CreditCard },
    ];

    const faqData = {
        general: [
            {
                id: "general-1",
                question: "What is DebateMate?",
                answer: "DebateMate is an AI-powered debate platform that helps you improve your argumentation skills through structured debates, personalized feedback, and interactive learning paths. Whether you're a student, professional, or debate enthusiast, DebateMate provides the tools to enhance your critical thinking and communication abilities.",
                icon: "FaQuestionCircle"
            },
            {
                id: "general-2",
                question: "How does DebateMate work?",
                answer: "DebateMate uses advanced AI to facilitate debates, provide real-time feedback, and create personalized learning experiences. You can engage in debates with AI opponents or other users, receive detailed analysis of your arguments, and follow curated learning paths to improve specific skills.",
                icon: "FaCogs"
            },
            {
                id: "general-3",
                question: "Who can use DebateMate?",
                answer: "DebateMate is designed for anyone looking to improve their debate and argumentation skills. This includes students preparing for competitions, professionals enhancing their persuasion abilities, educators teaching critical thinking, and anyone interested in developing better communication skills.",
                icon: "FaUsers"
            },
            {
                id: "general-4",
                question: "Do I need prior debate experience?",
                answer: "Not at all! DebateMate is designed for all skill levels, from complete beginners to experienced debaters. Our adaptive learning system adjusts to your skill level and provides appropriate challenges and guidance.",
                icon: "FaGraduationCap"
            }
        ],
        debates: [
            {
                id: "debates-1",
                question: "What types of debates are available?",
                answer: "DebateMate offers various debate formats including Oxford-style, Parliamentary, Lincoln-Douglas, and casual discussions. You can debate against AI opponents with different difficulty levels or challenge other users in real-time matches.",
                icon: "FaComments"
            },
            {
                id: "debates-2",
                question: "How are debates scored and evaluated?",
                answer: "Our AI evaluates debates based on argument structure, evidence quality, logical reasoning, and persuasiveness. You receive detailed feedback on strengths and areas for improvement, along with specific recommendations for skill development.",
                icon: "FaChartLine"
            },
            {
                id: "debates-3",
                question: "Can I choose my debate topics?",
                answer: "Yes! You can select from our extensive topic library covering politics, ethics, technology, environment, and more. You can also suggest custom topics or let our AI recommend topics based on your interests and skill level.",
                icon: "FaListUl"
            },
            {
                id: "debates-4",
                question: "How long do debates typically last?",
                answer: "Debate duration varies by format and preference. Quick matches can be completed in 10-15 minutes, while comprehensive debates may last 30-60 minutes. You can also pause and resume debates at your convenience.",
                icon: "FaClock"
            }
        ],
        learning: [
            {
                id: "learning-1",
                question: "What are Learning Paths?",
                answer: "Learning Paths are structured curricula designed to develop specific debate skills. Each path includes theory lessons, practice exercises, and progressive challenges. Topics cover argumentation theory, logical fallacies, evidence evaluation, and persuasion techniques.",
                icon: "FaRoute"
            },
            {
                id: "learning-2",
                question: "How does the AI mentor work?",
                answer: "Our AI mentor provides personalized guidance based on your performance and goals. It identifies your strengths and weaknesses, suggests targeted practice areas, and offers real-time tips during debates to help you improve.",
                icon: "FaRobot"
            },
            {
                id: "learning-3",
                question: "Are there certificates available?",
                answer: "Yes! Upon completing Learning Paths and achieving certain milestones, you can earn digital certificates that validate your debate skills. These can be shared on professional networks or included in academic portfolios.",
                icon: "FaCertificate"
            },
            {
                id: "learning-4",
                question: "Can I track my progress?",
                answer: "Absolutely! Your dashboard provides comprehensive analytics including skill progression, debate history, performance metrics, and personalized recommendations. You can set goals and monitor your improvement over time.",
                icon: "FaChartBar"
            }
        ],
        community: [
            {
                id: "community-1",
                question: "How do I find debate partners?",
                answer: "Our matchmaking system connects you with opponents of similar skill levels and interests. You can also join debate clubs, participate in tournaments, or challenge friends directly through our platform.",
                icon: "FaSearchPlus"
            },
            {
                id: "community-2",
                question: "Are there moderated discussions?",
                answer: "Yes! We host regular moderated debate sessions on trending topics, led by experienced moderators. These provide opportunities to engage with diverse perspectives in a structured environment.",
                icon: "FaGavel"
            },
            {
                id: "community-3",
                question: "Can I create private debate groups?",
                answer: "Premium users can create private groups for teams, classes, or organizations. These include custom topics, progress tracking, and administrative tools for educators and team leaders.",
                icon: "FaLock"
            },
            {
                id: "community-4",
                question: "What are the community guidelines?",
                answer: "We maintain a respectful environment focused on constructive discourse. Our guidelines prohibit personal attacks, hate speech, and off-topic discussions. Violations are addressed through our reporting system and moderation team.",
                icon: "FaShieldAlt"
            }
        ],
        privacy: [
            {
                id: "privacy-1",
                question: "How is my data protected?",
                answer: "We use industry-standard encryption and security measures to protect your personal information and debate content. Your data is stored securely and never shared with third parties without explicit consent.",
                icon: "FaShield"
            },
            {
                id: "privacy-2",
                question: "Can I delete my account and data?",
                answer: "Yes, you have full control over your data. You can download your information or request complete account deletion at any time. We comply with GDPR and other privacy regulations.",
                icon: "FaTrash"
            },
            {
                id: "privacy-3",
                question: "Are my debates public?",
                answer: "By default, debates are private between participants. You can choose to make debates public or share them with specific groups. Anonymous participation options are also available for sensitive topics.",
                icon: "FaEye"
            },
            {
                id: "privacy-4",
                question: "How do you use AI responsibly?",
                answer: "Our AI systems are designed with ethical principles in mind. We ensure fairness, transparency, and accuracy in evaluations. Human oversight prevents bias and maintains quality standards in all AI interactions.",
                icon: "FaBrain"
            }
        ],
        billing: [
            {
                id: "billing-1",
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through industry-standard payment processors.",
                icon: "FaCreditCard"
            },
            {
                id: "billing-2",
                question: "Can I change or cancel my subscription?",
                answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings. Changes take effect at the next billing cycle, and you'll retain access until the current period ends.",
                icon: "FaExchangeAlt"
            },
            {
                id: "billing-3",
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied within the first month, contact our support team for a full refund. Refunds for other situations are evaluated case-by-case.",
                icon: "FaUndo"
            },
            {
                id: "billing-4",
                question: "Are there student or educational discounts?",
                answer: "Yes! We offer special pricing for students, educators, and educational institutions. Contact our sales team with your educational credentials to learn about available discounts and institutional licensing options.",
                icon: "FaGraduationCap"
            }
        ]
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
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

    const headerVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="container mx-auto max-w-6xl relative">
                    <motion.div
                        className="text-center mb-16"
                        variants={headerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <HelpCircle className="w-8 h-8 text-primary" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            Find answers to common questions about DebateMate. Can't find what you're looking for?
                            We're here to help!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                                <Link href="/contact">Contact Support</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/demo">Try Demo</Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Category Navigation */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-2 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {faqCategories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${activeCategory === category.id
                                            ? 'bg-primary text-primary-foreground shadow-lg'
                                            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                                        }
                  `}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    {category.label}
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    {/* FAQ Content */}
                    <motion.div
                        className="max-w-4xl mx-auto"
                        key={activeCategory}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="space-y-4">
                            {faqData[activeCategory as keyof typeof faqData]?.map((faq) => (
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
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto max-w-4xl px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Our support team is here to help you get the most out of DebateMate.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg">
                                <Link href="/contact">Get in Touch</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/roadmap">View Roadmap</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default FAQPage;