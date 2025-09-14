// src/app/components/CartBadge.jsx
"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartBadge() {
  const { cart = [] } = useCart() || {};
  const qty = cart.reduce((acc, p) => acc + (p.qty || 0), 0);

  return (
    <Link href="/cart" className="inline-flex items-center relative" aria-label="View cart">
      <span aria-hidden>🛒</span>
      <span className="sr-only">Cart</span>
      <span
        className="ml-2 inline-block min-w-[20px] text-center text-xs font-semibold text-white bg-green-600 rounded-full"
        style={{ pointerEvents: "none", padding: "2px 6px" }}
      >
        {qty}
      </span>
    </Link>
  );
}
