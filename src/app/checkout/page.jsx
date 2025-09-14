// src/app/checkout/page.jsx
"use client";

import React from "react";
import CheckoutForm from "./CheckoutForm";
import { useCart } from "../context/CartContext"; // adjust path if needed

export default function CheckoutPage() {
  // get cart from your CartContext provider
  const { cart: cartItemsFromContext = [] } = useCart() || {};

  // You can also compute cartTotal here and pass it down,
  // but CheckoutForm below will compute itself if not passed.
  return (
    <div className="max-w-3xl mx-auto p-6">
      <CheckoutForm cartItems={cartItemsFromContext} />
    </div>
  );
}
