// src/app/shop/[id]/page.jsx
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import products from "@/data/products";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams(); // dynamic [id]
  const router = useRouter();
  const product = products.find((p) => p.id === id);

  const sizes = product?.sizes || [6, 7, 8, 9, 10];
  const [size, setSize] = useState(sizes[0]);
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-xl font-bold">Product not found</h1>
        <button
          onClick={() => router.push("/shop")}
          className="mt-4 px-4 py-2 border rounded"
        >
          Back to shop
        </button>
      </main>
    );
  }

  const handleAdd = () => {
    addToCart({ ...product, size }, qty);
    router.push("/cart"); // take user to cart after adding
  };

  return (
    <main className="max-w-5xl mx-auto p-8 grid md:grid-cols-2 gap-8">
      <div className="relative w-full h-[400px] rounded overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <div className="text-2xl font-extrabold">₹{product.price}</div>

        {/* Size selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Size
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 border rounded flex items-center justify-center"
            >
              −
            </button>
            <div className="w-10 text-center">{qty}</div>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-8 border rounded flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          className="bg-emerald-600 text-white px-6 py-3 rounded shadow mt-4"
        >
          Add to cart
        </button>
      </div>
    </main>
  );
}
