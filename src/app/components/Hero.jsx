import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-green-100 rounded-lg mx-8 my-8 p-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Step Into Sustainability</h1>
      <p className="text-lg mb-6">Discover eco-friendly shoes crafted for comfort, performance, and the planet 🌍</p>
      <div className="space-x-4">
        <Link href="/shop" className="bg-green-600 text-white px-6 py-3 rounded-md">Shop Now</Link>
        <Link href="/about" className="border px-6 py-3 rounded-md">Learn More</Link>
      </div>
    </section>
  );
}
