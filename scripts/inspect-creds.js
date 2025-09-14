/**
 * scripts/inspect-creds.js
 * Run: node scripts/inspect-creds.js
 *
 * Safe: this prints only non-secret info (project_id, client_email, key shape),
 *       it DOES NOT print the private key value itself.
 */

const fs = require("fs");
const path = require("path");

function safePrint(msg) {
  console.log(msg);
}

function inspectServiceAccountFile() {
  const saPath = path.join(process.cwd(), "serviceAccount.json");
  if (fs.existsSync(saPath)) {
    try {
      const raw = fs.readFileSync(saPath, "utf8");
      const json = JSON.parse(raw);
      safePrint("Found serviceAccount.json at project root.");
      safePrint("project_id: " + (json.project_id || "(missing)"));
      safePrint("client_email: " + (json.client_email || "(missing)"));
      const pk = json.private_key || "";
      safePrint("private_key present: " + (!!pk));
      if (pk) {
        safePrint("private_key seems to startWith -----BEGIN PRIVATE KEY-----: " + (pk.trim().startsWith("-----BEGIN PRIVATE KEY-----")));
        // do NOT print the key
      }
      return true;
    } catch (err) {
      safePrint("Failed to parse serviceAccount.json: " + err.message);
      return false;
    }
  }
  return false;
}

function inspectEnvVars() {
  const pid = process.env.FIREBASE_PROJECT_ID;
  const email = process.env.FIREBASE_CLIENT_EMAIL;
  const pkey = process.env.FIREBASE_PRIVATE_KEY;

  if (!pid && !email && !pkey) {
    safePrint("No FIREBASE_ env vars found in the current environment.");
    return false;
  }

  safePrint("Environment variables found:");
  safePrint("FIREBASE_PROJECT_ID: " + (pid || "(missing)"));
  safePrint("FIREBASE_CLIENT_EMAIL: " + (email || "(missing)"));
  safePrint("FIREBASE_PRIVATE_KEY present: " + (!!pkey));

  if (pkey) {
    // check whether the private key appears to contain literal newlines or escaped \n
    const containsNewline = pkey.includes("\n");
    const containsEscaped = pkey.includes("\\n");
    safePrint("FIREBASE_PRIVATE_KEY contains literal newline chars: " + containsNewline);
    safePrint("FIREBASE_PRIVATE_KEY contains escaped \\n sequences: " + containsEscaped);
    if (!containsNewline && !containsEscaped) {
      safePrint("Note: private key exists but does not contain '\\n' nor literal newlines — this is unusual. Ensure you copied it correctly.");
    } else if (containsNewline && !containsEscaped) {
      safePrint("WARNING: private key contains literal newlines. For .env.local you must replace actual newlines with \\n and wrap the value in double quotes.");
    } else if (containsEscaped) {
      safePrint("private key contains escaped \\n (looks correct for .env.local).");
    }
  }

  return true;
}

function main() {
  safePrint("=== Inspect Firebase credentials ===");
  const saFound = inspectServiceAccountFile();
  if (!saFound) {
    safePrint("serviceAccount.json not found at project root.");
    const envFound = inspectEnvVars();
    if (!envFound) {
      safePrint("No credentials found. Use option A (place serviceAccount.json at project root) or option B (set FIREBASE_ environment variables).");
      process.exitCode = 2;
      return;
    }
  }
  safePrint("=== Done ===");
}

main();
