"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 flex items-center justify-center text-white font-bold text-xl mr-2">
                D
              </div>
              <span className="text-xl font-bold">DebateMate</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              DebateMate is the leading AI-powered platform for debate training,
              helping users improve their critical thinking and persuasion
              skills.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {["Blog", "Guides", "FAQ", "Support", "API Docs"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "GDPR",
                "Accessibility",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 DebateMate. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
