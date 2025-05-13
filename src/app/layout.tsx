import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ClientOnly from "@/components/ClientOnly";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DebateMate: Elevate Your Argument Game",
  description: "1-on-1 AI-driven debates with real-time feedback.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Scroll to Top stays outside all providers for visibility */}
        <ScrollToTop />

        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <ClientOnly>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
            </ThemeProvider>
          </ClientOnly>
        </ClerkProvider>
      </body>
    </html>
  );
}
