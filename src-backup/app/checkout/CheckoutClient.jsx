"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function CheckoutClient() {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: "Bhoomika Muppala",
            email: "bhoomika2292004@gmail.com",
            address: "Bengaluru BTM layout 2nd stage 26th main road",
          },
          items: cart,
          total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
        }),
      });

      if (!res.ok) throw new Error("Order failed");
      const data = await res.json();

      toast.success(`Order placed! ID: ${data.id}`);
      clearCart();
    } catch (err) {
      console.error(err);
      toast.error(`Order error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={placeOrder}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {loading ? "Placing..." : "Place Order"}
      </button>
    </div>
  );
}
