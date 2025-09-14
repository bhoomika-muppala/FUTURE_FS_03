// src/app/checkout/complete/page.jsx
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// dynamic import the client component and disable SSR so Next won't try to prerender it
const CheckoutCompleteClient = dynamic(
  () => import("./CheckoutCompleteClient"),
  { ssr: false }
);

export default function CheckoutCompletePage() {
  return (
    <Suspense fallback={<div className="p-8">Loading receipt...</div>}>
      <CheckoutCompleteClient />
    </Suspense>
  );
}
