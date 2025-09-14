// src/app/shop/[id]/page.jsx
import ProductDetailClient from "../../components/ProductDetailClient";
import { products } from "../../data/products";

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="text-gray-600">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
