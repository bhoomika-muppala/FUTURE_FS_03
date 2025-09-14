// src/app/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t mt-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Eco Stride — Built with ♥
      </div>
    </footer>
  );
}
