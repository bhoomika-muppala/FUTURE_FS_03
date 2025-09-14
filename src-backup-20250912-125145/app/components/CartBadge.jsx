// src/app/components/CartBadge.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartBadge() {
  const { cart = [] } = useCart();
  const [mounted, setMounted] = useState(false);

  // avoid hydration mismatch: show count only after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const count = (cart && cart.length) || 0;

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
        </svg>
        <span>Cart</span>
        {/* show small badge only after mount to avoid SSR/client mismatch */}
        {mounted && count > 0 && (
          <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {count}
          </span>
        )}
      </span>
    </Link>
  );
}
