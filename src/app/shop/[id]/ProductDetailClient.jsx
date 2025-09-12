// src/app/shop/[id]/ProductDetailClient.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext"; // make sure this hook is exported

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();

  // ensure product.image is an absolute path or starts with '/'
  const imgSrc = product.image?.startsWith("/") ? product.image : `/${product.image}`;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Large image (keeps aspect and looks nice) */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Right: Details + clean single-line buttons */}
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">{product.name}</h1>

          <p className="text-2xl text-emerald-700 font-semibold mb-6">₹{product.price}</p>

          <p className="text-gray-600 mb-8">{product.description}</p>

          {/* Buttons row: Add to cart | Save for later | Checkout */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => addToCart(product)}
              className="px-6 py-3 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
            >
              Add to Cart
            </button>

            <button
              // toggle local 'saved' or call whatever action you want here
              onClick={() => {
                // simple feedback (you can replace with actual logic)
                alert("Saved for later (demo)");
              }}
              className="px-6 py-3 rounded-md border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition"
            >
              Save for Later
            </button>

            <Link
              href="/checkout"
              className="px-6 py-3 rounded-md bg-violet-600 text-white font-semibold hover:bg-violet-700 transition inline-flex items-center"
            >
              Checkout →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
