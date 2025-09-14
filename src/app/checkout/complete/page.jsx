// src/app/checkout/complete/page.jsx
"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DownloadReceiptButton from "./DownloadReceiptButton";

/**
 * Client-side Checkout Complete page
 * - Marked "use client" so hooks like useSearchParams work
 * - Fetches order via /api/orders?id=...
 * - Shows friendly receipt and uses DownloadReceiptButton to generate PDF
 */

export default function CheckoutCompletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams?.get("id");

  const [order, setOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(Boolean(id));
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!id) {
      setError("No order id provided in URL.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(`/api/orders?id=${encodeURIComponent(id)}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => res.statusText || "Unknown error");
          throw new Error(txt || res.statusText || `status ${res.status}`);
        }

        const json = await res.json();
        if (!cancelled) setOrder(json);
      } catch (err) {
        console.error("fetch order failed:", err);
        if (!cancelled) setError(String(err.message || err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <header className="mb-8">
        <div className="rounded-lg bg-green-50 p-8">
          <h1 className="text-3xl font-extrabold">Thank you — your order is confirmed</h1>
          <p className="mt-3 text-gray-700">
            We've received your order and sent a confirmation to your email. You can download a
            receipt or view the order below.
          </p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => router.push("/")}
              className="bg-emerald-600 text-white px-5 py-3 rounded shadow"
            >
              Continue shopping
            </button>
            {/* admin list removed from public UI for security */}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-lg border p-6 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <strong>Order ID:</strong>{" "}
                <span className="text-indigo-700">{id || "—"}</span>
              </div>
              <div className="text-sm text-gray-500">{/* placed date shown in receipt if available */}</div>
            </div>

            <div className="mt-4">
              {loading && <div className="text-gray-600">Loading order…</div>}

              {error && (
                <div className="mt-4 text-red-600">
                  Unable to load order. Check server logs. <br />
                  <small className="text-xs text-red-400">{error}</small>
                </div>
              )}

              {!loading && !error && order && (
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Customer</div>
                    <div className="font-medium">{order.name}</div>
                    <div className="text-sm text-gray-600">{order.email}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">Delivery address</div>
                    <div className="font-medium">{order.address || "—"}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">Items</div>
                    <ul className="mt-2 space-y-2">
                      {Array.isArray(order.items) && order.items.length ? (
                        order.items.map((it, i) => (
                          <li
                            key={i}
                            className="flex justify-between items-center bg-gray-50 rounded p-3"
                          >
                            <div>
                              <div className="font-medium">{it.name}{it.size ? ` — size ${it.size}` : ""}</div>
                              <div className="text-sm text-gray-500">Qty: {it.qty}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">₹{it.price}</div>
                              <div className="text-sm text-gray-400">
                                Subtotal: ₹{Number(it.price || 0) * Number(it.qty || 1)}
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">No items found.</div>
                      )}
                    </ul>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-2xl font-extrabold">₹{order.total || 0}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border p-6 bg-white">
            <h3 className="font-medium mb-2">Need help with your order?</h3>
            <p className="text-sm text-gray-600 mb-4">
              If you have questions about shipping, returns or changes contact our support team.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 border rounded">Email support</button>
              <button className="px-4 py-2 border rounded">Contact form</button>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border p-6 bg-white">
            <h4 className="font-medium mb-4">Receipt</h4>
            <div className="flex justify-between text-sm text-gray-600">
              <div>Subtotal</div>
              <div>₹{order?.total ?? 0}</div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <div>Shipping</div>
              <div>Free</div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center">
              <div className="font-bold text-lg">Total</div>
              <div className="font-bold text-lg">₹{order?.total ?? 0}</div>
            </div>

            {/* Download button component */}
            <DownloadReceiptButton order={order} />
          </div>
        </aside>
      </section>
    </main>
  );
}
