// src/app/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ product }) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="bg-[#f8f2ec] rounded-md p-4 flex items-center justify-center">
          {/* Use a plain img tag from public/ assets */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain rounded"
          />
        </div>

        <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
        <p className="text-green-700 font-bold mt-1">{product.price}</p>
        <p className="text-sm text-gray-500 mt-3">{product.description}</p>

        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 border rounded">More Info</button>
          <button className="px-4 py-2 bg-green-700 text-white rounded">Add</button>
        </div>
      </div>
    </article>
  );
}
