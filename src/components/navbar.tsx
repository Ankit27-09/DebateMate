"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();


  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
    { name: "Roadmap", href: "/roadmap" },
  ];


  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => setMobileMenuOpen(false);
    if (mobileMenuOpen) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);


  if (!isClient) return null;


  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/70 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 flex items-center justify-center text-white font-bold text-xl mr-2">
                D
              </div>
              <span className="text-xl font-bold text-foreground">DebateMate</span>
            </motion.div>
          </Link>

          {!isMobile && (
            <>
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "font-medium transition-colors",
                          isActive
                            ? "text-indigo-600"
                            : "text-accent-foreground hover:text-indigo-600"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="flex items-center space-x-4">
                <SignedOut>
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                    <ModeToggle />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
                    <SignInButton>
                      <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">Log In</Button>
                    </SignInButton>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
                    <SignUpButton>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Sign Up Free</Button>
                    </SignUpButton>
                  </motion.div>
                </SignedOut>

                <SignedIn>
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                    <ModeToggle />
                  </motion.div>
                  <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <UserButton />
                </SignedIn>
              </div>
            </>
          )}

          {isMobile && (
            <div className="flex items-center space-x-2">
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                <ModeToggle />
              </motion.div>
              <motion.button
                className="md:hidden text-accent-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg z-50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div key={link.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                    <Link
                      href={link.href}
                      className="text-accent-foreground hover:text-indigo-600 font-medium block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="flex flex-col space-y-4 pt-4">
                  <SignedOut>
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                      <SignInButton>
                        <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 w-full">Log In</Button>
                      </SignInButton>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
                      <SignUpButton>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">Sign Up Free</Button>
                      </SignUpButton>
                    </motion.div>
                  </SignedOut>

                  <SignedIn>
                    <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <div className="flex justify-center">
                      <UserButton />
                    </div>
                  </SignedIn>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}