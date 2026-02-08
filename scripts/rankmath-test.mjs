/**
 * Update RankMath SEO fields via RankMath REST API
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
const env = {};
envContent.split("\n").forEach((l) => {
  const [k, ...v] = l.split("=");
  if (k && v.length) env[k.trim()] = v.join("=").trim();
});

const WP_URL = "https://wp.4dejunio.com";
const AUTH = "Basic " + Buffer.from(`${env.WP_AUTH_USER}:${env.WP_AUTH_APP_PASSWORD}`).toString("base64");

async function tryEndpoint(url, method = "GET", body = null) {
  const opts = {
    method,
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);
  
  try {
    const res = await fetch(url, opts);
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text.substring(0, 300); }
    console.log(`${method} ${url.replace(WP_URL, "")} → ${res.status}`);
    if (typeof data === "object") {
      console.log("  ", JSON.stringify(data).substring(0, 300));
    } else {
      console.log("  ", data);
    }
    return { status: res.status, data };
  } catch (e) {
    console.log(`${method} ${url.replace(WP_URL, "")} → ERROR: ${e.message}`);
    return null;
  }
}

async function main() {
  console.log("=== Discovering RankMath REST API ===\n");

  // List all RankMath endpoints
  await tryEndpoint(`${WP_URL}/wp-json/rankmath/v1`);

  console.log("\n=== Try updating SEO via RankMath API ===\n");

  // Try the updateMeta endpoint
  await tryEndpoint(`${WP_URL}/wp-json/rankmath/v1/updateMeta`, "POST", {
    objectID: 57,
    objectType: "post",
    meta: {
      rank_math_title: "KOME Test",
      rank_math_description: "Test description for KOME",
    },
  });

  // Try updateRedirection
  await tryEndpoint(`${WP_URL}/wp-json/rankmath/v1/updateSeoMeta`, "POST", {
    objectID: 57,
    objectType: "post",
    title: "KOME Test",
    description: "Test description",
  });

  console.log("\n=== Check current project 57 meta via different methods ===\n");

  // Check the project via REST API - look at all fields
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/project/57`, {
    headers: { Authorization: AUTH },
  });
  const project = await res.json();
  console.log("All project keys:", Object.keys(project).join(", "));
  console.log("meta:", JSON.stringify(project.meta));

  // Try getting head for the project
  await tryEndpoint(`${WP_URL}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent("https://wp.4dejunio.com/project/kome/")}`);
}

main().catch(console.error);
