
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

import { ChatBot } from "@/components/chatbot"; // 👈 import your chatbot component here
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "DebateMate",
  description: "AI-powered debate training platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (

    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ChatBot /> 
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}