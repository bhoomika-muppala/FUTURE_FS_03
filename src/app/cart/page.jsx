// src/app/cart/page.jsx
"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart = [], cartTotal = 0, updateQty, removeFromCart } = useCart();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size || "nosize"}`} className="flex items-center justify-between border rounded p-4 bg-white">
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-600">Qty: {item.qty}</div>
                  {item.size && <div className="text-sm text-gray-600">Size: {item.size}</div>}

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.size, (item.qty || 1) - 1)}
                      className="w-8 h-8 rounded border flex items-center justify-center"
                      aria-label={`Decrease ${item.name}`}
                    >
                      −
                    </button>
                    <div className="w-10 text-center">{item.qty}</div>
                    <button
                      onClick={() => updateQty(item.id, item.size, (item.qty || 1) + 1)}
                      className="w-8 h-8 rounded border flex items-center justify-center"
                      aria-label={`Increase ${item.name}`}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="ml-4 text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-medium">₹{Number(item.price).toFixed(2)}</div>
                  <div className="text-sm text-gray-500">
                    Subtotal: ₹{(Number(item.price) * item.qty).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="font-semibold">Total: ₹{Number(cartTotal).toFixed(2)}</div>

            <div className="mt-4 flex gap-4">
              <Link href="/checkout" className="inline-block">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                  Checkout
                </button>
              </Link>
              <Link href="/shop" className="inline-block">
                <button className="border px-4 py-2 rounded">Continue shopping</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
