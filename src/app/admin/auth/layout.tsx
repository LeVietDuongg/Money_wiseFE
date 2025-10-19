"use client";

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 🌈 Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-emerald-600 to-green-400 animate-gradient" />

      {/* ✨ Hiệu ứng overlay nhẹ */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* 💎 Ánh sáng mờ để tăng chiều sâu */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-green-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl" />

      {/* 🔳 Form container */}
      <main className="relative z-10 w-full max-w-md px-6 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
