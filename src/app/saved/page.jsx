// src/app/saved/page.jsx
"use client";

import React from "react";

/**
 * Saved page (client component)
 * - Reads saved items from localStorage (browser) and renders them.
 * - Keeps server-side build from failing by preventing any access to localStorage outside useEffect.
 */

export default function SavedPage() {
  const [items, setItems] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("savedItems") || "[]";
      const parsed = JSON.parse(raw);
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("failed to read savedItems:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Saved items</h1>

      {loading && <div className="text-gray-600">Loading saved items…</div>}

      {!loading && (!items || items.length === 0) && (
        <div className="text-gray-600">No saved items found.</div>
      )}

      {!loading && items && items.length > 0 && (
        <div className="space-y-4">
          {items.map((it, i) => (
            <div key={i} className="p-4 border rounded bg-white">
              <div className="font-medium">{it.name || "Unnamed item"}</div>
              {it.description && <div className="text-sm text-gray-600">{it.description}</div>}
              <div className="mt-2 text-sm text-gray-500">Price: ₹{it.price ?? "N/A"}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
