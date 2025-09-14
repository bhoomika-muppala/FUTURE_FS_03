// src/app/api/orders/[id]/route.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import admin from "firebase-admin";

/**
 * Attempts to initialize firebase-admin if not already initialized.
 * Order of preference:
 * 1. If GOOGLE_APPLICATION_CREDENTIALS / ADC is present, firebase-admin will use it automatically.
 * 2. Try loading serviceAccount.json from project root (SERVICE_ACCOUNT_PATH).
 * 3. Try reading explicit env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 */
function initFirebaseAdmin() {
  if (admin.apps && admin.apps.length) {
    // already initialized
    return;
  }

  // 1) If Google ADC present, admin.credential.applicationDefault() will use it.
  // But we'll still try explicit cert fallback if no apps exist.
  const SERVICE_ACCOUNT_PATH = path.join(process.cwd(), "serviceAccount.json");

  try {
    // If serviceAccount.json exists in project root, use it
    if (fs.existsSync(SERVICE_ACCOUNT_PATH)) {
      const json = fs.readFileSync(SERVICE_ACCOUNT_PATH, "utf8");
      const serviceAccount = JSON.parse(json);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("[firebaseAdmin] initialized using serviceAccount.json");
      return;
    }
  } catch (e) {
    console.error("[firebaseAdmin] failed to init from serviceAccount.json:", e);
    // fall through to next option
  }

  // 2) Try env var fields (used when you paste keys into .env.local)
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey && privateKey.indexOf("\\n") !== -1) {
    // Sometimes privateKey is stored with literal \n; replace them with real newlines
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  if (projectId && clientEmail && privateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log("[firebaseAdmin] initialized using env vars");
      return;
    } catch (e) {
      console.error("[firebaseAdmin] failed to init from env vars:", e);
    }
  }

  // 3) Last resort: try ADC (application default credentials)
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    console.log("[firebaseAdmin] initialized using applicationDefault()");
    return;
  } catch (e) {
    console.error("[firebaseAdmin] applicationDefault() init failed:", e);
  }
}

/**
 * Helper to return Firestore DB (throws if not initialized)
 */
function getDbOrThrow() {
  if (!admin.apps || !admin.apps.length) {
    throw new Error("Firebase admin not initialized. See server logs for details.");
  }
  return admin.firestore();
}

/**
 * GET /api/orders/[id]
 * Returns the order document with the requested id (id from route params)
 */
export async function GET(req, context) {
  try {
    // Next.js message: await params before using
    const params = await context.params;
    const { id } = params ?? {};

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    // init firebase admin if needed
    initFirebaseAdmin();

    // get db (throws if admin init failed)
    const db = getDbOrThrow();

    // fetch order
    const docRef = db.collection("orders").doc(id.toString());
    const snap = await docRef.get();

    if (!snap.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const data = snap.data() ?? {};
    // Convert Firestore Timestamp to ISO if present in createdAt
    if (data.createdAt && data.createdAt.toDate) {
      try {
        data.createdAt = data.createdAt.toDate().toISOString();
      } catch (err) {
        // ignore conversion errors
      }
    }

    return NextResponse.json({ id: snap.id, ...data }, { status: 200 });
  } catch (err) {
    console.error("GET /api/orders/[id] error:", err);
    const msg = (err && err.message) ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
