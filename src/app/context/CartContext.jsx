// src/app/context/CartContext.jsx
"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // items: { id, name, price, qty, image, size }

  function addToCart(product, qty = 1) {
    setCart((prev) => {
      // match by id + size so same product different sizes are separate
      const found = prev.find((p) => p.id === product.id && p.size === product.size);
      if (found) {
        return prev.map((p) =>
          p.id === product.id && p.size === product.size
            ? { ...p, qty: (Number(p.qty || 0) + Number(qty || 1)) }
            : p
        );
      }
      return [...prev, { ...product, qty: Number(qty || 1) }];
    });
  }

  function removeFromCart(id, size) {
    setCart((prev) => prev.filter((p) => !(p.id === id && p.size === size)));
  }

  function updateQty(id, size, qty) {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id && p.size === size ? { ...p, qty: Math.max(0, Number(qty || 0)) } : p
        )
        .filter((p) => p.qty > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, p) => sum + (Number(p.price || 0) * (Number(p.qty || 1))), 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
