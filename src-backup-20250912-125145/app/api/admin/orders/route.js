// src/app/api/admin/orders/route.js
import { NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin'; // adjust path if needed

export async function GET() {
  try {
    const db = admin.firestore();
    const snap = await db.collection('orders').orderBy('createdAt', 'desc').get();

    const orders = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        customer: d.customer || {},
        items: d.items || [],
        total: d.total ?? 0,
        // normalize createdAt so the client can parse it easily:
        createdAt: d.createdAt ? d.createdAt.toMillis() : null, // milliseconds number
      };
    });

    return NextResponse.json(orders);
  } catch (err) {
    console.error('admin/orders GET error', err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
