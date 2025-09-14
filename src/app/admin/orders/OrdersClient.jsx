"use client";

import { useEffect, useState } from "react";

/**
 * Admin Orders page (client component)
 * - Fetches GET /api/admin/orders
 * - Expects the API to return an array of orders:
 *   [{ id, name, email, address, items: [{ id, name, price, qty }], total, createdAt }, ...]
 *
 * Replace or drop this file into: src/app/admin/orders/page.jsx
 */

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch("/api/admin/orders", { cache: "no-store" });

        // server returned HTML (error page) or JSON error
        if (!res.ok) {
          const text = await res.text();
          console.error("Failed api:", text);
          setErr("Failed to fetch orders. See console for details.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (!cancelled) {
          setOrders(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch (e) {
        console.error("Admin orders fetch error:", e);
        if (!cancelled) {
          setErr("Network error while fetching orders.");
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Orders (admin)</h1>
        <p>Loading orders…</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Orders (admin)</h1>
        <div className="text-red-600 mb-2">{err}</div>
        <p>Open the browser console to see server error details.</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Orders (admin)</h1>
        <p>No orders yet.</p>
      </div>
    );
  }

  // Helper to format date nicely
  const fmtDate = (ts) => {
    try {
      const d = ts && ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
      return d.toLocaleString();
    } catch {
      return String(ts);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Orders (admin)</h1>

      <div style={{ overflowX: "auto" }}>
        <table className="min-w-full border-collapse" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="text-left p-2 border-b">Order ID</th>
              <th className="text-left p-2 border-b">Customer</th>
              <th className="text-left p-2 border-b">Email</th>
              <th className="text-left p-2 border-b">Address</th>
              <th className="text-left p-2 border-b">Created</th>
              <th className="text-left p-2 border-b">Items</th>
              <th className="text-right p-2 border-b">Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id || Math.random()}>
                <td className="p-2 align-top border-b" style={{ minWidth: 150 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 13 }}>{o.id}</div>
                </td>

                <td className="p-2 align-top border-b">{o.name || "—"}</td>
                <td className="p-2 align-top border-b">{o.email || "—"}</td>
                <td className="p-2 align-top border-b" style={{ maxWidth: 280 }}>
                  <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {o.address || "—"}
                  </div>
                </td>

                <td className="p-2 align-top border-b">{fmtDate(o.createdAt)}</td>

                <td className="p-2 align-top border-b">
                  {Array.isArray(o.items) && o.items.length ? (
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {o.items.map((it, i) => (
                        <li key={i}>
                          {it.name} — {it.qty ?? 1} × {formatCurrency(it.price ?? 0)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>No items</div>
                  )}
                </td>

                <td className="p-2 align-top border-b text-right">
                  {formatCurrency(o.total ?? 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// small helper to format currency (INR default — change if needed)
function formatCurrency(v) {
  const n = Number(v) || 0;
  return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
