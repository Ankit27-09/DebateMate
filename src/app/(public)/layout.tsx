import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";
import ScrollToTop from "@/components/ScrollToTop";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      {children}
      <Footer />
    </div>
  );
}
