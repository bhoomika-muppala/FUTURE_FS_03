// src/app/components/ProductCard.jsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [size, setSize] = React.useState("");
  const [error, setError] = React.useState("");

  // available sizes — change as you like
  const sizes = ["6", "7", "8", "9", "10", "11"];

  const handleAdd = () => {
    if (!size) {
      setError("Please select a size");
      return;
    }
    setError("");
    // pass chosen size inside product object
    addToCart({ ...product, size }, 1);
  };

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white flex flex-col">
      <div className="flex-1">
        <Image
          src={product.image}
          alt={product.name}
          width={420}
          height={300}
          className="rounded object-cover w-full h-48"
        />
        <h3 className="font-semibold mt-4 text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-3 font-bold">₹{product.price}</div>

        <label className="block mt-4 text-sm text-gray-700">Size</label>
        <select
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
            setError("");
          }}
          className="mt-1 block w-full border rounded px-3 py-2"
        >
          <option value="">Select size</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
        >
          Add to cart
        </button>
        <Link href={`/shop/${product.id}`} className="inline-block">
          <button className="border px-4 py-2 rounded bg-white">View</button>
        </Link>
      </div>
    </div>
  );
}
