"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { name: "Microsoft", logo: "/microsoft-logo.svg" },
  { name: "Google", logo: "/google-logo.svg" },
  { name: "Apple", logo: "/apple-logo.svg" },
  { name: "Amazon", logo: "/Amazon-Logo.png" },
  { name: "Meta", logo: "/Meta-logo.png" },
  { name: "Netflix", logo: "/netflix-logo.svg" },
  { name: "Tesla", logo: "/Tesla-Logo.png" },
  { name: "OpenAI", logo: "/openai-logo.svg" },
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
              className="flex-shrink-0 flex items-center justify-center transition-all opacity-80 hover:opacity-100 w-[120px] h-[40px]"
            >
              <Image
                src={logo.logo}
                alt={logo.name}
                width={120}
                height={40}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
