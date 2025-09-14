"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext"; // adjust path if different

export default function CartClient() {
  const router = useRouter();
  const { cart, updateQty, removeFromCart, subtotal } = useCart();

  const handleProceed = () => {
    // navigate to checkout page
    router.push("/checkout");
  };

  const handleContinue = () => {
    // send user back to shop (or router.back())
    router.push("/shop");
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Your cart</h2>
        <p className="mt-6">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your cart</h2>

      {cart.map((it) => (
        <div key={it.id} className="mb-4 border p-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-sm">₹{it.price} × {it.qty}</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))}
                className="px-3 py-1 border rounded"
              >
                −
              </button>

              <div>{it.qty}</div>

              <button
                onClick={() => updateQty(it.id, it.qty + 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(it.id)}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 border rounded flex items-center justify-between">
        <div className="font-medium">Subtotal</div>
        <div className="font-bold">₹{subtotal}</div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleProceed}
          className="bg-green-700 text-white px-5 py-2 rounded"
        >
          Proceed to checkout
        </button>

        <button
          onClick={handleContinue}
          className="border px-5 py-2 rounded"
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
}
