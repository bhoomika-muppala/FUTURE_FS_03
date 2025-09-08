import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-ecoBeige shadow-md">
      <div className="text-xl font-bold">EcoStride</div>
      <div className="space-x-6">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
