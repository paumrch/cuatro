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
const REST = `${WP_URL}/wp-json`;

async function inspectProject() {
  // Check project 57 (KOME) fields
  const res = await fetch(`${REST}/wp/v2/project/57`, { headers: { Authorization: AUTH } });
  const d = await res.json();
  console.log("Project keys:", Object.keys(d).join(", "));
  
  // Look for RankMath fields
  const seoKeys = Object.keys(d).filter(k => 
    k.includes("rank") || k.includes("seo") || k.includes("meta") || k.includes("yoast")
  );
  console.log("\nSEO-related keys:", seoKeys);
}

async function checkRankMathAPI() {
  // Check if RankMath REST API is available
  const endpoints = [
    "/rankmath/v1/getHead?url=https://wp.4dejunio.com/project/kome/",
    "/rankmath/v1/getHead?url=https://4dejunio.com/work/kome",
  ];
  
  for (const ep of endpoints) {
    try {
      const res = await fetch(`${REST}${ep}`, { headers: { Authorization: AUTH } });
      console.log(`\n${ep} → ${res.status}`);
      if (res.ok) {
        const data = await res.json();
        console.log("  Response:", JSON.stringify(data).substring(0, 300));
      }
    } catch (e) {
      console.log(`\n${ep} → Error: ${e.message}`);
    }
  }

  // Try updating RankMath meta via post meta
  try {
    const res = await fetch(`${REST}/wp/v2/project/57`, { headers: { Authorization: AUTH } });
    const project = await res.json();
    console.log("\n--- KOME (ID:57) full meta ---");
    if (project.meta) console.log("meta:", JSON.stringify(project.meta, null, 2));
    // Check for rank_math fields
    for (const k of Object.keys(project)) {
      if (k.startsWith("rank_math")) {
        console.log(`${k}:`, project[k]);
      }
    }
  } catch (e) {
    console.log("Error:", e.message);
  }
}

await inspectProject();
await checkRankMathAPI();
