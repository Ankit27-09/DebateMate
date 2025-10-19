"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Animated 404 Text */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 mb-4">
                        404
                    </div>

                    {/* Animated decorative elements */}
                    <motion.div
                        className="flex justify-center space-x-2 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 bg-indigo-600 rounded-full"
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>

                {/* Content */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Oops! Page Not Found
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                        The page you&apos;re looking for seems to have wandered off into the debate void.
                        Let&apos;s get you back to where the action is!
                    </p>

                    {/* Action Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white group">
                            <Link href="/" className="flex items-center space-x-2">
                                <Home className="w-4 h-4" />
                                <span>Back to Home</span>
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            </Link>
                        </Button>

                        <Button asChild variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 group">
                            <Link href="/features" className="flex items-center space-x-2">
                                <Search className="w-4 h-4" />
                                <span>Explore Features</span>
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Additional Links */}
                    <motion.div
                        className="pt-8 border-t border-border/50 mt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <p className="text-sm text-muted-foreground mb-4">
                            Looking for something specific?
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <Link
                                href="/features"
                                className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                            >
                                Features
                            </Link>
                            <Link
                                href="/pricing"
                                className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/contact"
                                className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                            >
                                Contact
                            </Link>
                            <Link
                                href="/dashboard"
                                className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Decorative Background Element */}
                <motion.div
                    className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600/20 to-indigo-800/20 blur-3xl" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}