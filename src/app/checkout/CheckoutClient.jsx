// src/app/checkout/CheckoutClient.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutClient() {
  const [cart, setCart] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart') || '[]';
      const parsed = JSON.parse(raw);
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error('Error reading cart', err);
      setCart([]);
    }
  }, []);

  if (cart === null) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-extrabold mb-6">Checkout</h2>
        <p className="text-slate-600">Loading cart…</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-extrabold mb-6">Checkout</h2>
        <p className="text-slate-600">Your cart is empty. Add items before checking out.</p>
      </div>
    );
  }

  const total = cart.reduce(
    (s, it) => s + (Number(it.price || 0) * Number(it.qty || 1)),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      customer: { name, email, address },
      items: cart,
      total,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Some APIs return non-JSON on error, so read text first and try to parse.
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        data = { error: text || 'Invalid server response' };
      }

      if (res.ok) {
        // success
        localStorage.removeItem('cart');
        // friendly confirmation (replace with toast later)
        alert('Order placed! Order ID: ' + (data.id || 'unknown'));
        router.push('/');
      } else {
        // show server-provided error if available
        const serverMsg = data?.error || data?.message || text || 'Unknown error';
        alert('Order error: ' + serverMsg);
      }
    } catch (err) {
      console.error('Network or fetch error', err);
      alert('Network error: ' + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-extrabold mb-6">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full border p-2 rounded"
          />
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border p-2 rounded"
            type="email"
          />
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full border p-2 rounded"
          />
          <div className="flex items-center gap-4">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded">
              {loading ? 'Placing...' : `Place Order — ₹${total.toFixed(0)}`}
            </button>
            <a href="/cart" className="text-sm text-gray-600">Back to cart</a>
          </div>
        </form>

        <div className="border rounded p-4">
          <h3 className="font-medium mb-3">Order summary</h3>
          <div className="space-y-3">
            {cart.map((it, i) => (
              <div key={i} className="flex justify-between">
                <div>{it.name} x {it.qty || 1}</div>
                <div>₹{(Number(it.price || 0) * Number(it.qty || 1)).toFixed(0)}</div>
              </div>
            ))}
            <div className="flex justify-between font-semibold border-t pt-3">
              <div>Total</div>
              <div>₹{total.toFixed(0)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
