"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { name: "Company 1", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company 2", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company 3", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company 4", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company 5", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company 6", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company 7", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Company 8", logo: "/placeholder.svg?height=40&width=120" },
];

// Duplicate logos for seamless loop
const marqueeLogos = [...logos, ...logos];

export default function LogoMarquee() {
  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h3 className="text-center text-muted-foreground font-medium">
          Trusted by leading organizations
        </h3>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background/90 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background/90 to-transparent z-10" />

        <motion.div
          className="flex space-x-12 py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {marqueeLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
            >
              <Image
                src={logo.logo || "/placeholder.svg"}
                alt={logo.name}
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
