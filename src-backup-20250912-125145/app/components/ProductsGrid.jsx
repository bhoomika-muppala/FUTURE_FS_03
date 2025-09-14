// src/app/components/ProductsGrid.jsx
'use client';

import ProductCard from './ProductCard';
import { products } from '../data/products';

/**
 * mode: "grid" | "list"
 */
export default function ProductsGrid({ mode = 'grid' }) {
  // grid layout classes vs vertical list
  const containerClass =
    mode === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
      : 'flex flex-col gap-6';

  return (
    <section id="products" className="py-12">
      <h2 className="text-2xl font-heading font-semibold mb-6">Our Collection — TEST</h2>
      <div className={containerClass}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} mode={mode} />
        ))}
      </div>
    </section>
  );
}
