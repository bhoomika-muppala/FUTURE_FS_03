import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { initAdmin } from "@/lib/firebaseAdmin";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");

  // simple admin check (replace with Firebase Auth later)
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const app = initAdmin();
    const db = getFirestore(app);
    const snap = await db.collection("orders").orderBy("createdAt", "desc").get();
    const orders = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(orders);
  } catch (err) {
    console.error("admin/orders GET failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
