"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navbar() {
  const [isClient, setIsClient] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    setIsClient(true) // Ensure component runs only on the client
  }, [])

  useEffect(() => {
    if (isClient) {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [isClient])

  if (!isClient) {
    return null
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
    { name: "Roadmap", href: "/roadmap" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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
              <span className="text-xl font-bold text-gray-900">DebateMate</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link href={link.href} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              {/* Sign In / Sign Up buttons for signed-out users */}
              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <SignInButton>
                    <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                      Log In
                    </Button>
                  </SignInButton>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <SignUpButton>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Sign Up Free</Button>
                </SignUpButton>
              </motion.div>
            </SignedOut>

            <SignedIn>
              {/* Display signed-in user info or a logout button */}
              <button className="border-indigo-600 py-2 px-4 rounded">
                <UserButton />
              </button>
            </SignedIn>

            {/* Mobile Menu Button */}
            {isMobile && (
              <motion.button
                className="md:hidden text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-indigo-600 font-medium block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <SignInButton>
                    <Button
                      variant="outline"
                      className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50 justify-center"
                    >
                      Log In
                    </Button>
                  </SignInButton>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
