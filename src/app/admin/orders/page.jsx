// src/app/admin/orders/page.jsx
import React from "react";

function formatCreatedAt(createdAt) {
  if (!createdAt) return "";
  try {
    // Firestore Timestamp instance often has toDate()
    if (typeof createdAt.toDate === "function") {
      return createdAt.toDate().toLocaleString();
    }

    // Some builds / serializations use an object with _seconds
    if (createdAt._seconds) {
      return new Date(createdAt._seconds * 1000).toLocaleString();
    }

    // other possible shape: { seconds: 1234567890 }
    if (createdAt.seconds) {
      return new Date(createdAt.seconds * 1000).toLocaleString();
    }

    // if it's already a number (ms or seconds)
    if (typeof createdAt === "number") {
      // Heuristic: if value is 10-digit -> seconds, if 13-digit -> ms
      if (String(createdAt).length <= 10) {
        return new Date(createdAt * 1000).toLocaleString();
      }
      return new Date(createdAt).toLocaleString();
    }

    // string parse fallback
    const parsed = new Date(createdAt);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleString();
    }

    return "";
  } catch {
    return "";
  }
}

export default async function AdminOrdersPage() {
  // server-side fetch: include admin secret header
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/admin/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_SECRET}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => res.statusText);
    throw new Error(`Failed to load admin orders: ${txt || res.status}`);
  }

  const orders = await res.json();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">All Orders</h1>

      {(!orders || orders.length === 0) && <div>No orders found.</div>}

      <div className="space-y-6">
        {orders.map((o) => (
          <article key={o.id} className="rounded border p-4 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-600">Order ID:</div>
                <div className="font-medium text-indigo-700">{o.id}</div>
              </div>
              <div className="text-sm text-gray-500">
                {formatCreatedAt(o.createdAt)}
              </div>
            </div>

            <div className="mt-3">
              <div className="text-sm text-gray-500">Customer</div>
              <div className="font-medium">{o.name} {o.email ? `(${o.email})` : ""}</div>
              <div className="text-sm text-gray-600">Address: {o.address || "—"}</div>
            </div>

            <div className="mt-3">
              <div className="text-sm text-gray-500 font-medium">Items</div>
              <ul className="mt-2 list-disc pl-5">
                {(o.items || []).length > 0 ? (
                  (o.items || []).map((it, i) => (
                    <li key={i}>
                      {it.name} — qty: {it.qty} — price: ₹{it.price}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">No items recorded</li>
                )}
              </ul>
            </div>

            <div className="mt-3 text-right font-bold">Total: ₹{o.total ?? 0}</div>
          </article>
        ))}
      </div>
    </main>
  );
}
