// src/app/checkout/complete/page.jsx
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// dynamically import the client component and enable suspense
const CheckoutCompleteClient = dynamic(() => import("./CheckoutCompleteClient"), {
  suspense: true,
});

export default function CheckoutCompletePageServer() {
  return (
    <React.Fragment>
      {/* Suspense boundary required when using dynamic(..., { suspense: true }) */}
      <Suspense fallback={<div className="p-8 text-center">Loading checkout details…</div>}>
        <CheckoutCompleteClient />
      </Suspense>
    </React.Fragment>
  );
}
