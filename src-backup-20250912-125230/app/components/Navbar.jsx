// src/app/components/Navbar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) => (pathname === href ? 'border-b-2 border-green-700' : '');

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center">
            <img src="/assets/hero.jpg" alt="logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="ml-3 text-green-700 font-semibold">EcoStride</span>
          </Link>
        </div>

        <nav className="flex items-center space-x-6">
          <Link href="/" className={`text-sm ${isActive('/')}`}>Home</Link>
          <Link href="/about" className={`text-sm ${isActive('/about')}`}>About</Link>
          <Link href="/shop" className={`text-sm ${isActive('/shop')}`}>Products</Link>
          <Link href="/checkout" className={`text-sm ${isActive('/checkout')}`}>Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
