import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ClientOnly from "@/components/ClientOnly"; // Add this
import Navbar from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs';
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
  title: "DebateMate: Elevate Your Argument Game",
  description: "1-on-1 AI-driven debates with real-time feedback.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
        </body>
      </html>
    </ClerkProvider>
  );
}
