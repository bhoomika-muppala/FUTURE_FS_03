'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const total = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      alert('Please fill all fields');
      return;
    }

    // Save order to localStorage (optional)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = { id: Date.now().toString(36), items: cart, total, customer: form, createdAt: new Date().toISOString() };
    localStorage.setItem('orders', JSON.stringify([order, ...orders]));

    alert(`Order placed! ID: ${order.id}`);
    clearCart();
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center">
                  <div className="w-20 h-20 mr-4 relative rounded overflow-hidden bg-gray-100">
                    {/* thumbnail size so it doesn't expand */}
                    <Image src={item.image || '/assets/hero.jpg'} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">₹{item.price} × {item.qty || 1}</div>
                  </div>
                </div>
                <div className="font-semibold">₹{((item.price || 0) * (item.qty || 1)).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="text-lg font-bold">Total: ₹{total.toFixed(2)}</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />
            <textarea name="address" placeholder="Shipping Address" value={form.address} onChange={handleChange} className="w-full border p-2 rounded" />
            <button type="submit" className="px-6 py-3 bg-emerald-700 text-white rounded">Place Order</button>
          </form>
        </>
      )}
    </div>
  );
}
