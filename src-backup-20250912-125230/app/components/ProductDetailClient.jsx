// src/app/components/ProductDetailClient.jsx
"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const imgSrc =
    product?.imageURL && product.imageURL.trim() !== ""
      ? product.imageURL
      : "/assets/hero.jpg";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative w-full h-80 md:h-96 bg-gray-50 rounded">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover rounded"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-heading font-bold mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>
          <div className="text-2xl font-semibold mb-8">₹{product.price}</div>

          <button
            onClick={handleAdd}
            className="px-5 py-2 bg-primary text-white rounded-md hover:opacity-90 transition w-fit"
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
