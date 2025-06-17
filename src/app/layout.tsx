
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from "react";
import { ThemeProvider as HydrationSafeThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";


export const metadata = {
  title: "DebateMate",
  description: "AI-powered debate training platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <HydrationSafeThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </HydrationSafeThemeProvider>

    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>

        </body>
      </html>
    </ClerkProvider>
  );
}
