"use client";
import React from "react";
import { useCart } from "@/app/context/CartContext";

export default function CartDebug() {
  const { cart, addToCart, cartCount, cartTotal } = useCart();
  return (
    <div style={{border:"1px dashed #ddd", padding: 12}}>
      <div>Cart items: {cartCount}</div>
      <div>Total: ₹{cartTotal}</div>
      <button onClick={() => addToCart({ id: 999, title: "Test", price: 100 })}>Add Test Item</button>
    </div>
  );
}
