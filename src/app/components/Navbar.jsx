// src/app/components/Navbar.jsx
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="EcoStride" className="w-10 h-10 rounded-full" />
          <span className="text-emerald-700 font-bold">EcoStride</span>
        </Link>

        <nav className="space-x-6 hidden md:flex items-center text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/shop" className="hover:underline">Products</Link>
          <Link href="/checkout" className="hover:underline">Checkout</Link>
        </nav>

        <div className="md:hidden"> {/* simple mobile menu placeholder */}
          <button aria-label="open menu" className="p-2 rounded-full bg-emerald-50">☰</button>
        </div>
      </div>
    </header>
  );
}
