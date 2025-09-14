// src/app/api/orders/route.js
import { NextResponse } from "next/server";
import admin from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    const body = await req.json();
    const db = admin.firestore();

    const docRef = await db.collection("orders").add({
      ...body,
      createdAt: admin.firestore.FieldValue.serverTimestamp(), // ✅ add this
    });

    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
