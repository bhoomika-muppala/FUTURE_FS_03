// src/app/components/OrderSummaryClient.jsx
"use client";

import React from "react";
import { useCart } from "../context/CartContext";

/**
 * OrderSummaryClient - shows items & total
 * - Always uses stable keys (cartItemId or fallback)
 */
export default function OrderSummaryClient() {
  const { cart = [] } = useCart();

  const total = cart.reduce(
    (s, it) => s + Number(it.price || 0) * (Number(it.qty) || 1),
    0
  );

  return (
    <aside className="p-6 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Order summary</h3>

      {/* we keep same root structure regardless of empty or not */}
      {(!cart || cart.length === 0) ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <div className="text-sm text-gray-500 mb-3">Qty: {cart.reduce((a, b) => a + (b.qty || 1), 0)}</div>

          <ul className="space-y-4 mb-4">
            {cart.map((it, idx) => {
              const key = it.cartItemId || `${it.id ?? it.name}-${idx}`;
              return (
                <li key={key} className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">Qty: {it.qty ?? 1}</div>
                  </div>
                  <div className="text-emerald-700 font-semibold">₹{it.price}</div>
                </li>
              );
            })}
          </ul>

          <div className="mt-2 flex items-center justify-between">
            <div className="text-lg font-bold">Total:</div>
            <div className="text-xl font-extrabold">₹{total}</div>
          </div>
        </>
      )}
    </aside>
  );
}
