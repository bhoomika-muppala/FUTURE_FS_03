// src/app/components/AddToCartButton.jsx
"use client";
import React from "react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product, selectedSize }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      qty: 1,
    };
    addToCart(item, 1);
  };

  return (
    <button
      onClick={handleAdd}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
    >
      Add to cart
    </button>
  );
}
