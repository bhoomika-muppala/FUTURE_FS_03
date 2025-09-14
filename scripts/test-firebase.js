// scripts/test-firebase.js
import { initAdmin, getFirestoreInstance } from "../src/lib/firebaseAdmin.js";

async function run() {
  try {
    initAdmin();
    const db = getFirestoreInstance();
    console.log("✅ Firestore client ready");

    const snap = await db.collection("orders").limit(1).get();
    console.log("Docs:", snap.size);
    snap.forEach((d) => console.log(d.id, d.data()));
    process.exit(0);
  } catch (err) {
    console.error("❌ Firestore test failed", err);
    process.exit(1);
  }
}
run();
