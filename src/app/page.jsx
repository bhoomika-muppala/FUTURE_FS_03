// src/app/page.jsx
"use client";

import ProductsGrid from "./components/ProductsGrid";

export default function HomePage() {
  return (
    <main>
      {/* ✅ Hero Section */}
      <section className="bg-green-100 py-16 text-center rounded-lg mx-4 my-8">
        <h1 className="text-4xl font-bold mb-4">Step Into Sustainability</h1>
        <p className="text-lg text-gray-700">
          Discover eco-friendly shoes crafted for comfort, performance, and the planet 🌍
        </p>
        <div className="mt-6 space-x-4">
          <a
            href="/shop"
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700"
          >
            Shop Now
          </a>
          <a
            href="/about"
            className="border border-green-600 text-green-600 px-6 py-3 rounded-lg shadow hover:bg-green-50"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* ✅ Products Section */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-bold text-center mb-8">Our Collection</h2>
        <ProductsGrid />
      </section>
    </main>
  );
}
