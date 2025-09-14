// src/app/cart/CartClient.jsx
"use client";
import { useCart } from "../context/CartContext";

export default function CartClient() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  if (!cart.length) return <div style={{ padding: 40 }}>Cart is empty.</div>;

  return (
    <div style={{ padding: 40 }}>
      {cart.map((it) => (
        <div key={`${it.id}-${it.qty}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #eee" }}>
          <div>
            <div style={{ fontWeight: 600 }}>{it.name}</div>
            <div style={{ color: "#666" }}>₹{it.price} × {it.qty}</div>
          </div>
          <div>
            <button onClick={() => removeFromCart(it.id)} style={{ marginRight: 8 }}>Remove</button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 12, fontWeight: 700 }}>Total: ₹{total}</div>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => clearCart()} style={{ marginRight: 8 }}>Clear</button>
        <button>Place Order</button>
      </div>
    </div>
  );
}
