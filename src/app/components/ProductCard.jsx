// src/app/components/ProductCard.jsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext'; // adjust path if needed

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  // Choose a safe image source (null/undefined instead of empty string)
  const imgSrc = product?.imageURL && product.imageURL.trim() !== '' ? product.imageURL : null;
  const placeholder = '/assets/hero.jpg'; // small neutral placeholder in public/assets

  return (
    <div className="border rounded-md p-4 flex flex-col">
      <div className="relative w-full h-48 mb-3 bg-gray-50 rounded">
        {imgSrc ? (
          <Image src={imgSrc} alt={product.name} fill style={{ objectFit: 'cover' }} className="rounded" />
        ) : (
          // fallback to a placeholder image — safe because src is non-empty
          <Image src={placeholder} alt="placeholder" fill style={{ objectFit: 'cover' }} className="rounded" />
        )}
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
