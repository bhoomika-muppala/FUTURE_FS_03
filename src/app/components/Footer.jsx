// src/app/components/Footer.jsx
import Link from "next/link";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="mt-16 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">EcoStride</h3>
          <p className="text-sm text-gray-600">Sustainable sneakers built for everyday comfort.</p>

          <div className="mt-6 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/80">
              <SparklesIcon className="w-5 h-5 text-green-700" />
            </span>
            <span className="text-sm text-gray-600">Made with care</span>
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-2">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/shop">All products</Link></li>
              <li><Link href="/collection">Collection</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Follow</h4>
            <div className="flex items-center gap-3 mt-2">
              <a href="#" aria-label="Instagram" className="text-gray-700 hover:text-gray-900"><FaInstagram /></a>
              <a href="#" aria-label="Twitter" className="text-gray-700 hover:text-gray-900"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-700 hover:text-gray-900"><FaLinkedin /></a>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-yellow-100">
        <div className="max-w-7xl mx-auto px-8 py-6 text-sm text-gray-600 flex items-center justify-between">
          <div>© 2025 EcoStride. All rights reserved.</div>
          <div className="text-gray-400">Built with ♥</div>
        </div>
      </div>
    </footer>
  );
}
