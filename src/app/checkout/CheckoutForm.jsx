// src/app/checkout/CheckoutForm.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // optional if you navigate
import { useCart } from "../context/CartContext"; // adjust path if necessary

export default function CheckoutForm({ cartItems: propCartItems = [] }) {
  const router = useRouter?.() ?? null;
  const context = useCart?.() ?? {};
  const cartFromContext = context.cart ?? [];

  // prefer propCartItems (passed from page), otherwise use context cart
  const initialItems = (Array.isArray(propCartItems) && propCartItems.length)
    ? propCartItems
    : cartFromContext;

  // local state for inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);

  // compute numeric total from items (price * qty)
  const computeTotal = (list) => {
    if (!Array.isArray(list)) return 0;
    return list.reduce((sum, it) => {
      // ensure numeric
      const price = Number(it.price ?? 0);
      const qty = Number(it.qty ?? 1);
      const safePrice = Number.isFinite(price) ? price : 0;
      const safeQty = Number.isFinite(qty) ? qty : 1;
      return sum + safePrice * safeQty;
    }, 0);
  };

  const cartTotal = computeTotal(items);

  // keep local items synced if propCartItems changes
  useEffect(() => {
    // only update when prop changes (avoid infinite setState loops)
    setItems(initialItems);
  }, [propCartItems, /* also re-run if context.cart changes */ cartFromContext.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!name || !email || !address) {
      alert("Please fill name, email and address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          address,
          items,
          // send a number, not string
          total: Number(cartTotal),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("create order API failed:", text);
        alert("Failed to place order. See console.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      // success — navigate to complete page and include id
      const id = data?.id ?? data?.orderId;
      if (id && router) {
        router.push(`/checkout/complete?id=${encodeURIComponent(id)}`);
      } else {
        alert("Order created. ID: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("create order error:", err);
      alert("Failed to place order. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <label className="block mb-2">
        <div className="text-sm font-medium">Name</div>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        <div className="text-sm font-medium">Email</div>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-4">
        <div className="text-sm font-medium">Address</div>
        <textarea
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
      </label>

      <div className="mb-4">
        <h3 className="font-semibold">Order items</h3>
        {items.length === 0 ? (
          <div>No items</div>
        ) : (
          items.map((it) => (
            <div key={it.id || it.name} className="flex justify-between py-2">
              <div>{it.name}</div>
              <div>
                ₹{Number(it.price ?? 0).toFixed(2)} × {it.qty ?? 1}
              </div>
            </div>
          ))
        )}
      </div>

      <p className="font-semibold">
        Total: ₹{(Number.isFinite(cartTotal) ? cartTotal : 0).toFixed(2)}
      </p>

      <div className="mt-4">
        <button
  type="submit"
  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
  disabled={loading}
>
  {loading ? "Placing order..." : "Proceed to place order"}
</button>

      </div>
    </form>
  );
}
