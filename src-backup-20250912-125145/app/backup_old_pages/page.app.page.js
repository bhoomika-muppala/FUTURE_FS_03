// src/app/page.js
import React from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import products from "../data/products"; // <- correct for src/data/products.js

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-ecoBeige text-gray-900">
        <section className="w-full relative overflow-hidden h-[420px] md:h-[520px] lg:h-[600px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/hero.jpg')` }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-xl text-center">
              EcoStride — Sustainable Sneakers
            </h1>
          </div>
        </section>

        <section id="collection" className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-8">Our Collection</h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <div key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
