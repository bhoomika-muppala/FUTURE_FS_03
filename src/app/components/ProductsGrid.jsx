// src/app/components/ProductsGrid.jsx
'use client';

import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductsGrid() {
  return (
    <section id="products" className="py-12">
      <h2 className="text-2xl font-heading font-semibold mb-6">Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
