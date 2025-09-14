// src/lib/firebaseAdmin.js
// Server-only module. Protect secrets; do NOT import this from client code.

import admin from "firebase-admin";
import fs from "fs";
import path from "path";

function normalizePrivateKey(key) {
  if (!key) return key;
  // If key contains literal '\n' sequences (common when stored in .env), convert to real newlines:
  if (key.indexOf("\\n") !== -1) {
    return key.replace(/\\n/g, "\n");
  }
  return key;
}

function loadServiceAccountFromFile() {
  const p = path.join(process.cwd(), "serviceAccount.json");
  if (fs.existsSync(p)) {
    try {
      const raw = fs.readFileSync(p, "utf8");
      return JSON.parse(raw);
    } catch (err) {
      console.error("[firebaseAdmin] failed to parse serviceAccount.json:", err.message);
      return null;
    }
  }
  return null;
}

export function initAdmin() {
  // If an app already exists, just return it:
  const apps = admin.apps || [];
  if (apps.length) {
    return admin.app();
  }

  // 1) Try serviceAccount.json at project root (local dev convenience)
  const sa = loadServiceAccountFromFile();
  if (sa && sa.private_key) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(sa),
      });
      console.log("[firebaseAdmin] initialized from serviceAccount.json");
      return admin.app();
    } catch (err) {
      console.error("[firebaseAdmin] initializeApp failed with serviceAccount.json:", err.message);
      // fallthrough to try env variables
    }
  }

  // 2) Try FIREBASE_SERVICE_ACCOUNT environment variable (JSON string)
  const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (rawServiceAccount) {
    try {
      const parsed = JSON.parse(rawServiceAccount);
      if (parsed && parsed.private_key) {
        parsed.private_key = normalizePrivateKey(parsed.private_key);
        admin.initializeApp({
          credential: admin.credential.cert(parsed),
        });
        console.log("[firebaseAdmin] initialized from FIREBASE_SERVICE_ACCOUNT env var");
        return admin.app();
      } else {
        console.error("[firebaseAdmin] FIREBASE_SERVICE_ACCOUNT missing private_key");
      }
    } catch (err) {
      console.error("[firebaseAdmin] Invalid JSON in FIREBASE_SERVICE_ACCOUNT:", err.message);
    }
  }

  // 3) Try individual env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    try {
      privateKey = normalizePrivateKey(privateKey);
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log("[firebaseAdmin] initialized from FIREBASE_* env vars");
      return admin.app();
    } catch (err) {
      console.error("[firebaseAdmin] initializeApp failed with env vars:", err.message);
      throw err; // credential problem — bubble up so caller sees error
    }
  }

  // Nothing worked:
  const msg =
    "Missing Firebase admin credentials. Set FIREBASE_SERVICE_ACCOUNT (JSON) or FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY or place serviceAccount.json at project root (for local dev).";
  console.error("[firebaseAdmin]", msg);
  throw new Error(msg);
}

// small helper if you just want firestore instance
export function getFirestoreInstance() {
  initAdmin();
  return admin.firestore();
}

export default admin;
