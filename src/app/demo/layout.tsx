import React from "react";

export default function DemoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-center justify-center h-screen p-4 bg-gray-100">
      {children}
    </div>
  );
}
