// src/app/components/Header.jsx
import Link from "next/link";
import CartBadge from "./CartBadge";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-transparent shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-emerald-700">
          EcoStride
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">Home</Link>
          <Link href="/shop" className="text-sm text-gray-700 hover:text-gray-900">Shop</Link>
          <Link href="/about" className="text-sm text-gray-700 hover:text-gray-900">About</Link>
          <Link href="/contact" className="text-sm text-gray-700 hover:text-gray-900">Contact</Link>

          <CartBadge />
        </nav>
      </div>
    </header>
  );
}
