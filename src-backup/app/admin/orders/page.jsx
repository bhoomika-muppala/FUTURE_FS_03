// src/app/admin/orders/page.jsx (server component fetching orders)
export default async function AdminOrdersPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/admin/orders`, { cache: 'no-store' });
  const orders = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 border">Order ID</th>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            // createdAt was normalized to milliseconds in API route above
            let createdText = '-';
            if (o.createdAt) {
              const date = new Date(o.createdAt);
              createdText = isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
            }
            return (
              <tr key={o.id}>
                <td className="p-3 border">{o.id}</td>
                <td className="p-3 border">
                  <div className="font-medium">{o.customer?.name}</div>
                  <div className="text-sm text-gray-600">{o.customer?.email}</div>
                </td>
                <td className="p-3 border">₹{o.total}</td>
                <td className="p-3 border">{createdText}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
