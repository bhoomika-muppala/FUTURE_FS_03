// src/app/context/CartContext.jsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // rehydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart') || '[]';
      setCart(JSON.parse(raw));
    } catch (err) {
      console.error('Failed to parse cart from localStorage', err);
      setCart([]);
    }
  }, []);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart', err);
    }
  }, [cart]);

  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const idx = prev.findIndex((i) => String(i.id) === String(product.id));
      if (idx > -1) {
        // increment qty
        const next = [...prev];
        next[idx] = { ...next[idx], qty: (Number(next[idx].qty) || 1) + Number(qty) };
        return next;
      }
      // else add
      return [...prev, { ...product, qty: Number(qty) || 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((i) => String(i.id) !== String(productId)));
  }

  function updateQty(productId, qty) {
    setCart((prev) => prev.map((i) => (String(i.id) === String(productId) ? { ...i, qty: Number(qty) } : i)));
  }

  function clearCart() {
    setCart([]);
  }

  const value = { cart, addToCart, removeFromCart, updateQty, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
