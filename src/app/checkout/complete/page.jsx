// src/app/checkout/complete/page.jsx
"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DownloadReceiptButton from "./DownloadReceiptButton";

export default function CheckoutCompletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Checkout Complete</h1>
      <p>Your order ID: {id}</p>
      <DownloadReceiptButton orderId={id} />
      <button
        onClick={() => router.push("/")}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Go Home
      </button>
    </main>
  );
}
