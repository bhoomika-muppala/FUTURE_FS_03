// src/app/components/Header.jsx
"use client";

import React from "react";
import Link from "next/link";
import CartBadge from "./CartBadge";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-bold">eco-stride</Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/shop" className="text-sm">Shop</Link>
            <Link href="/about" className="text-sm">About</Link>
            <Link href="/contact" className="text-sm">Contact</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm">Home</Link>
          <div><CartBadge /></div>
        </div>
      </div>
    </header>
  );
}
