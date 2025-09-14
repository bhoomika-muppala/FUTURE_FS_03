// src/app/api/orders/route.js
import { NextResponse } from "next/server";
import { initAdmin, getFirestoreInstance } from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    initAdmin();
    const db = getFirestoreInstance();

    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "invalid body" }, { status: 400 });

    const { name, email, address, items = [], total } = body;

    if (!name || !email || items.length === 0) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }

    const order = {
      name,
      email,
      address: address || "",
      items,
      total: typeof total === "number" ? total : Number(total || 0),
      createdAt: new Date().toISOString(),
    };

    const ref = await db.collection("orders").add(order);
    return NextResponse.json({ id: ref.id, ...order }, { status: 201 });
  } catch (err) {
    console.error("POST /api/orders error:", err);
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    initAdmin();
    const db = getFirestoreInstance();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

    const doc = await db.collection("orders").doc(id).get();
    if (!doc.exists) return NextResponse.json({ error: "not found" }, { status: 404 });

    const data = doc.data();
    return NextResponse.json({ id: doc.id, ...data }, { status: 200 });
  } catch (err) {
    console.error("GET /api/orders error:", err);
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
