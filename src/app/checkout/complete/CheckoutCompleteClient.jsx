// src/app/checkout/complete/CheckoutCompleteClient.jsx
"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DownloadReceiptButton from "./DownloadReceiptButton";

export default function CheckoutCompleteClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams?.get("id");

  // ... your existing client code (fetching /api/orders etc)
  // (Use the code you already had for CheckoutCompletePage earlier)
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
    return () => { cancelled = true; };
  }, [id]);

  return (
    // paste your existing JSX UI here; it already works locally
    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* header / content / receipt / DownloadReceiptButton */}
      <header className="mb-8">
        <div className="rounded-lg bg-green-50 p-8">
          <h1 className="text-3xl font-extrabold">Thank you — your order is confirmed</h1>
          <p className="mt-3 text-gray-700">
            We've received your order and sent a confirmation to your email. You can download a receipt or view the order below.
          </p>
          <div className="mt-6">
            <button onClick={() => router.push("/")} className="bg-emerald-600 text-white px-5 py-3 rounded shadow">
              Continue shopping
            </button>
          </div>
        </div>
      </header>

      {/* the rest of your page uses order, loading, error */}
      {/* ... */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-lg border p-6 bg-white">
            <div className="flex items-start justify-between">
              <div><strong>Order ID:</strong> <span className="text-indigo-700">{id || "—"}</span></div>
              <div className="text-sm text-gray-500"></div>
            </div>

            <div className="mt-4">
              {loading && <div className="text-gray-600">Loading order…</div>}
              {error && <div className="mt-4 text-red-600">Unable to load order. <small className="text-xs text-red-400">{error}</small></div>}
              {!loading && !error && order && (
                <div className="mt-4 space-y-4">
                  {/* customer / address / items */}
                </div>
              )}
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
              <div>Shipping</div><div>Free</div>
            </div>
            <hr className="my-4"/>
            <div className="flex justify-between items-center">
              <div className="font-bold text-lg">Total</div>
              <div className="font-bold text-lg">₹{order?.total ?? 0}</div>
            </div>
            <DownloadReceiptButton order={order} />
          </div>
        </aside>
      </section>
    </main>
  );
}
