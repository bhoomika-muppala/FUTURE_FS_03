// src/app/components/ProductCard.jsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, mode = 'grid' }) {
  const { addToCart } = useCart?.() || { addToCart: () => {} }; // safe fallback for server rendering
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart && addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  // Prefer `product.image` (your data uses `image`) fall back to hero.
  const imgSrc = product?.image || '/assets/hero.jpg';

  // Different visual markup for list vs grid:
  if (mode === 'list') {
    // big horizontal/list card for home
    return (
      <div className="border rounded-md p-6 flex flex-col">
        <div className="mb-4 w-full h-48 relative bg-gray-50 rounded overflow-hidden">
          {/* Using a fixed size Image (not fill) so Next knows size */}
          <Image src={imgSrc} alt={product.name} width={1600} height={480} style={{ objectFit: 'cover' }} />
        </div>

        <div className="flex items-start justify-between">
          <div className="w-full pr-4">
            <h3 className="font-medium mb-1">{product.name} — ₹{product.price}</h3>
            <p className="text-sm text-gray-600 mb-3">{product.description}</p>
          </div>

          <div className="flex-shrink-0">
            <div className="font-semibold mb-2 text-right">₹{product.price}</div>
            <button onClick={handleAdd} className="px-4 py-2 bg-primary text-white rounded-md">
              {added ? 'Added' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // default: grid card
  return (
    <div className="border rounded-md p-4 flex flex-col">
      <div className="relative w-full h-48 mb-3 bg-gray-50 rounded overflow-hidden">
        {/* For grid, provide a fixed size image */}
        <Image src={imgSrc} alt={product.name} width={600} height={400} style={{ objectFit: 'cover' }} />
      </div>

      <h3 className="font-medium mb-1">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

      <div className="mt-auto flex items-center justify-between">
        <div className="font-semibold">₹{product.price}</div>
        <button onClick={handleAdd} className="px-3 py-1 bg-primary text-white rounded-md">
          {added ? 'Added' : 'Add'}
        </button>
      </div>
    </div>
  );
}
