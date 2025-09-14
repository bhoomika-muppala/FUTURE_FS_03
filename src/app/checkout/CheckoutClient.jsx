"use client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase"; // client SDK
import { useRouter } from "next/navigation";

export default function CheckoutSubmit({ customer, items }) {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        customer,
        items,
        total: items.reduce((s, it) => s + (it.price || 0), 0),
        createdAt: serverTimestamp(),
      });

      // Save the order id so the complete page can fetch it
      localStorage.setItem("lastOrderId", docRef.id);

      // navigate to complete page
      router.push("/checkout/complete");
    } catch (err) {
      console.error("Place order failed:", err);
      alert("Failed to place order. See console.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* render form fields here */}
      <button type="submit" className="btn">Place order</button>
    </form>
  );
}
