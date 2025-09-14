// src/app/saved/page.jsx
"use client";

import { useCart } from "../context/CartContext";

export default function SavedPage() {
  const { saved, clearSaved } = useCart();

  if (!saved.length) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-4">Saved Items</h2>
        <p className="text-gray-600">No saved items yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6">Saved for Later</h2>
      <ul className="space-y-4">
        {saved.map((item, idx) => (
          <li key={idx} className="border rounded-lg p-4 flex justify-between">
            <span>{item.name} – ₹{item.price}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={clearSaved}
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Clear Saved
      </button>
    </div>
  );
}
