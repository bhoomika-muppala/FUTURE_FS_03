import products from "../../data/products"; // recommended

import ProductsGrid from "../components/ProductsGrid";

export default function ShopPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Shop All</h1>
      <ProductsGrid products={products} />
    </div>
  );
}
