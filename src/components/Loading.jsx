// src/components/LoadingSpinner.jsx
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1e1a17]">
      <div className="relative w-24 h-24">
        {/* Outer Amber Ring */}
        <div className="absolute inset-0 border-8 border-t-transparent border-amber-500 rounded-full animate-spin"></div>

        {/* Inner Dim Ring */}
        <div className="absolute inset-4 border-4 border-t-transparent border-[#3a3028] rounded-full animate-spin-slow"></div>

        {/* Pulsing Glow Center */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-6 h-6 bg-amber-500 rounded-full animate-pulse shadow-lg shadow-amber-600/50"></div>
        </div>
      </div>

      {/* Tailwind custom animations */}
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}