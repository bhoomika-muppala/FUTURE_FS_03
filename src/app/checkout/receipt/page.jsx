"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReceiptPage({ searchParams }) {
  // Next's app router passes searchParams only to server components;
  // for a client component we can parse window.location if needed.
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // try to get id from query string
  const getIdFromUrl = () => {
    try {
      const u = new URL(window.location.href);
      return u.searchParams.get("id");
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const id = getIdFromUrl();
    if (!id) {
      setErr("Missing order id in the URL.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders?id=${encodeURIComponent(id)}`, {
          method: "GET",
          headers: { "Accept": "application/json" },
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText);
        }
        const data = await res.json();
        setOrder(data);
      } catch (e) {
        console.error("Failed to load order:", e);
        const msg = (e && e.message) || "Failed to load order.";
        setErr(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handlePrint = () => {
    // simple approach — open print dialog for the receipt
    window.print();
  };

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Loading receipt…</h2>
      </div>
    );
  }

  if (err) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold text-red-600">Unable to load receipt</h2>
        <p className="mt-2 text-sm text-gray-700">{err}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">No order found</h2>
      </div>
    );
  }

  const created = order.createdAt ? new Date(order.createdAt).toLocaleString() : "";
  const items = order.items || [];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-lg bg-emerald-50 p-8 border border-emerald-100">
          <h1 className="text-3xl font-extrabold text-slate-900">Thank you — your order is confirmed</h1>
          <p className="mt-2 text-gray-700">
            We've received your order and emailed a confirmation. Use the button on the right to print or save your receipt.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => (window.location.href = "/")}
              className="px-5 py-2 rounded shadow bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Continue shopping
            </button>
            <button
              onClick={() => (window.location.href = "/admin/orders")}
              className="px-5 py-2 rounded border bg-white"
            >
              View all orders
            </button>
            <button
              onClick={handlePrint}
              className="ml-auto px-5 py-2 rounded bg-emerald-600 text-white shadow hover:bg-emerald-700"
            >
              Download / Print receipt
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* left: order details */}
          <div className="col-span-2 rounded-lg bg-white p-6 border">
            <h2 className="text-xl font-bold">Order</h2>
            <p className="mt-2 text-sm text-gray-700">
              <strong>Order ID:</strong> {order.id}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Customer:</strong> {order.name} {order.email ? `(${order.email})` : ""}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Address:</strong> {order.address || "—"}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Created:</strong> {created}
            </p>

            <hr className="my-4" />

            <h3 className="font-semibold text-gray-900">Items</h3>
            <ul className="mt-2 space-y-2">
              {items.length === 0 && <li className="text-sm text-gray-600">No items listed.</li>}
              {items.map((it, idx) => (
                <li key={idx} className="flex items-center justify-between border rounded p-3">
                  <div>
                    <div className="font-medium">{it.name || it.title || "Product"}</div>
                    <div className="text-sm text-gray-600">Qty: {it.qty ?? 1}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{(it.price || 0).toFixed ? (it.price).toFixed(2) : it.price}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <div />
              <div className="text-right">
                <div className="text-sm text-gray-600">Subtotal</div>
                <div className="text-2xl font-bold">₹{order.total ?? 0}</div>
              </div>
            </div>
          </div>

          {/* right: summary */}
          <aside className="rounded-lg bg-white p-6 border">
            <h3 className="text-lg font-semibold">Receipt</h3>
            <div className="mt-4 text-sm text-gray-700 space-y-3">
              <div className="flex justify-between">
                <div>Subtotal</div>
                <div>₹{order.total ?? 0}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div className="font-medium">Free</div>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-bold">
                <div>Total</div>
                <div>₹{order.total ?? 0}</div>
              </div>

              <button
                onClick={handlePrint}
                className="mt-6 w-full px-4 py-2 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700"
              >
                Download receipt
              </button>
            </div>
          </aside>
        </div>

        <div className="rounded-lg bg-white p-6 border">
          <h4 className="font-semibold">Need help with your order?</h4>
          <p className="text-sm text-gray-600 mt-2">If you have questions about shipping, returns or changes contact support.</p>
        </div>
      </div>

      {/* print styles */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .min-h-screen, .min-h-screen * { visibility: visible; }
          .min-h-screen { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
