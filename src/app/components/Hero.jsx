// src/app/components/Hero.jsx
"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-12">
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        {/* Background Image */}
        <Image
          src="/assets/hero.jpg" // make sure your hero.jpg is inside public/assets
          alt="EcoStride Banner"
          width={1400}
          height={400}
          className="w-full h-[320px] object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Step Into Sustainability
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Discover eco-friendly shoes crafted for comfort, performance, and the planet 🌍
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="/shop"
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-full font-semibold text-white shadow-md transition"
            >
              Shop Now
            </a>
            <a
              href="/about"
              className="bg-white/90 hover:bg-white text-emerald-700 px-6 py-3 rounded-full font-semibold shadow-md transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
