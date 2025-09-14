// src/app/checkout/complete/page.jsx
import dynamic from "next/dynamic";

// Client component (will only run in the browser)
const CheckoutCompleteClient = dynamic(
  () => import("./CheckoutCompleteClient"),
  { ssr: false } // ensure client-only, avoid prerender issues
);

export default function CheckoutCompletePage() {
  return <CheckoutCompleteClient />;
}
