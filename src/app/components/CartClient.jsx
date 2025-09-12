'use client';

import { useEffect, useState } from 'react';

export default function CartClient() {
  const [cart, setCart] = useState(null); // null = not loaded yet

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart') || '[]';
      const parsed = JSON.parse(raw);
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error('Error reading cart from localStorage', err);
      setCart([]);
    }
  }, []);

  const removeItem = (index) => {
    setCart(prev => {
      const copy = [...prev];
      copy.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(copy));
      return copy;
    });
  };

  const updateQty = (index, qty) => {
    if (qty < 1) return;
    setCart(prev => {
      const copy = [...prev];
      copy[index].qty = qty;
      localStorage.setItem('cart', JSON.stringify(copy));
      return copy;
    });
  };

  // not loaded yet — render the same skeleton the server rendered (avoid mismatch)
  if (cart === null) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-extrabold mb-6">Your Cart</h2>
        <p className="text-slate-600">Loading your cart…</p>
      </div>
    );
  }

  // empty
  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-extrabold mb-6">Your Cart</h2>
        <p className="text-slate-600">Your cart is empty.</p>
      </div>
    );
  }

  const total = cart.reduce((s, it) => s + (Number(it.price || 0) * Number(it.qty || 1)), 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-extrabold mb-6">Your Cart</h2>

      <div className="space-y-6">
        {cart.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b pb-4">
            <div className="flex items-center gap-4">
              <img src={item.imageURL || '/assets/hero.jpg'} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">₹{item.price}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded">
                <button onClick={() => updateQty(idx, Number(item.qty || 1) - 1)} className="px-3 py-1">-</button>
                <div className="px-4">{item.qty || 1}</div>
                <button onClick={() => updateQty(idx, Number(item.qty || 1) + 1)} className="px-3 py-1">+</button>
              </div>

              <div className="font-semibold">₹{(Number(item.price || 0) * Number(item.qty || 1)).toFixed(0)}</div>

              <button onClick={() => removeItem(idx)} className="text-sm text-red-600 hover:underline">Remove</button>
            </div>
          </div>
        ))}

        <div className="flex justify-end items-center gap-4">
          <div className="text-lg font-semibold">Total: ₹{total.toFixed(0)}</div>
          <a href="/checkout" className="px-4 py-2 bg-primary text-white rounded">Checkout</a>
        </div>
      </div>
    </div>
  );
}
