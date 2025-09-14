// src/app/components/AddToCartButton.jsx
"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const toast = useToast();
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    try {
      addToCart(product, 1);
      toast?.push(`${product.name} added to cart`, "success", 2500);
    } catch (err) {
      console.error(err);
      toast?.push(`Could not add ${product.name}`, "error", 3000);
    } finally {
      setTimeout(() => setAdding(false), 300);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={adding}
      className={`btn inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
        ${adding ? "opacity-70" : "hover:shadow-md"} bg-emerald-600 text-white`}
      aria-pressed={adding}
    >
      {adding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
