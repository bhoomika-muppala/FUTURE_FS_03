// src/app/components/ProductsFilter.jsx
"use client";

import React from "react";

export default function ProductsFilter({ onChange }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div>
        <label className="mr-2">Sort</label>
        <select onChange={e => onChange?.({ sort: e.target.value })} className="border px-2 py-1 rounded">
          <option value="">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name A → Z</option>
        </select>
      </div>

      <div>
        <label className="mr-2">Category</label>
        <select onChange={e => onChange?.({ category: e.target.value })} className="border px-2 py-1 rounded">
          <option value="">All</option>
          <option value="running">Running</option>
          <option value="casual">Casual</option>
          <option value="trail">Trail</option>
        </select>
      </div>
    </div>
  );
}
