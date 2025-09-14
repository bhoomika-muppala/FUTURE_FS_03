import Hero from "./components/Hero";
import ProductsGrid from "./components/ProductsGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Show list on home */}
      <ProductsGrid mode="list" />
    </>
  );
}
