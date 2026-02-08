/**
 * WordPress REST API client for 4 de Junio
 * 
 * Usage:
 *   node scripts/wp-api.mjs test              → Test connection
 *   node scripts/wp-api.mjs list-posts         → List all posts
 *   node scripts/wp-api.mjs create-post        → Create a sample post (draft)
 *   node scripts/wp-api.mjs update-hero        → Update homepage hero text
 *   node scripts/wp-api.mjs info               → Show WP types, categories, pages
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const [key, ...val] = line.split("=");
  if (key && val.length) env[key.trim()] = val.join("=").trim();
});

const WP_URL = env.WORDPRESS_API_URL?.replace("/graphql", "") || "https://wp.4dejunio.com";
const WP_USER = env.WP_AUTH_USER;
const WP_PASS = env.WP_AUTH_APP_PASSWORD;
const AUTH = "Basic " + Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64");

const REST = `${WP_URL}/wp-json/wp/v2`;
const GRAPHQL = `${WP_URL}/graphql`;

// ─── Helpers ─────────────────────────────────────────────

async function wpRest(endpoint, options = {}) {
  const url = `${REST}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH,
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`WP REST Error ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function wpGraphQL(query, variables = {}) {
  const res = await fetch(GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  if (data.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
  }
  return data.data;
}

// ─── Commands ────────────────────────────────────────────

async function testConnection() {
  console.log("🔌 Testing WordPress connection...\n");
  const user = await wpRest("/users/me");
  console.log(`✅ Authenticated as: ${user.name} (ID: ${user.id})`);
  console.log(`   Email: ${user.email || "hidden"}`);
  console.log(`   URL: ${WP_URL}`);
}

async function info() {
  console.log("📋 WordPress site info\n");

  // Post types
  const types = await wpRest("/types");
  console.log("Post types:", Object.keys(types).join(", "));

  // Categories
  const cats = await wpRest("/categories?per_page=100");
  console.log("Categories:", cats.map((c) => `${c.id}:${c.name}`).join(", ") || "(none)");

  // Tags
  const tags = await wpRest("/tags?per_page=100");
  console.log("Tags:", tags.map((t) => `${t.id}:${t.name}`).join(", ") || "(none)");

  // Pages
  const pages = await wpRest("/pages?per_page=100");
  console.log("\nPages:");
  pages.forEach((p) => console.log(`  ${p.id} | ${p.slug} | ${p.title.rendered}`));

  // Projects (custom post type)
  try {
    const projects = await wpRest("/project?per_page=100");
    console.log("\nProjects:");
    projects.forEach((p) => console.log(`  ${p.id} | ${p.slug} | ${p.title.rendered}`));
  } catch {
    console.log("\nProjects: endpoint not available via REST (may need 'show_in_rest' enabled)");
  }
}

async function listPosts() {
  console.log("📝 Posts\n");
  try {
    const posts = await wpRest("/posts?per_page=50&status=publish,draft,private");
    if (posts.length === 0) {
      console.log("  No posts found.");
    }
    posts.forEach((p) => {
      console.log(`  ${p.id} | [${p.status}] ${p.title.rendered} (${p.slug})`);
    });
  } catch (e) {
    // Try without status filter (unauthenticated listing)
    const posts = await wpRest("/posts?per_page=50");
    if (posts.length === 0) {
      console.log("  No published posts found.");
    }
    posts.forEach((p) => {
      console.log(`  ${p.id} | ${p.title.rendered} (${p.slug})`);
    });
  }
}

async function createPost({ title, content, status = "draft", categories = [], tags = [] }) {
  console.log(`📝 Creating post: "${title}" [${status}]\n`);

  const post = await wpRest("/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      status,
      categories,
      tags,
    }),
  });

  console.log(`✅ Post created!`);
  console.log(`   ID: ${post.id}`);
  console.log(`   Slug: ${post.slug}`);
  console.log(`   Status: ${post.status}`);
  console.log(`   URL: ${post.link}`);
  return post;
}

async function updateHomepageHero(heading, subheading) {
  console.log(`🏠 Updating homepage hero...\n`);
  console.log(`   New heading: "${heading}"`);
  console.log(`   New subheading: "${subheading}"\n`);

  // The homepage hero uses ACF custom fields on the "home" page (ID: 2)
  // ACF fields need "Show in REST" enabled in the field group settings
  
  const pageId = 2; // Home page

  // Try updating via ACF fields on REST
  const res = await fetch(`${REST}/pages/${pageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH,
    },
    body: JSON.stringify({
      acf: { heading, subheading },
    }),
  });

  if (!res.ok) {
    console.log("❌ Error updating page:", res.status);
    return;
  }

  // Verify via GraphQL
  const gqlData = await wpGraphQL("{ pages { nodes { home { heading subheading } } } }");
  const current = gqlData.pages.nodes[0]?.home;

  if (current?.heading === heading && current?.subheading === subheading) {
    console.log("✅ Hero updated successfully!");
    console.log(`   Heading: "${current.heading}"`);
    console.log(`   Subheading: "${current.subheading}"`);
  } else {
    console.log("⚠️  REST API responded OK, but ACF fields didn't update in GraphQL.");
    console.log(`   Current heading:    "${current?.heading}"`);
    console.log(`   Current subheading: "${current?.subheading}"`);
    console.log("\n   To fix this, enable 'Show in REST API' in your ACF field group:");
    console.log("   wp-admin → ACF → Field Groups → Home → Settings → Show in REST API → Yes");
    console.log("\n   Or update directly: wp-admin → Pages → Inicio → edit the fields.");
  }
}

// ─── CLI ─────────────────────────────────────────────────

const command = process.argv[2];

switch (command) {
  case "test":
    await testConnection();
    break;

  case "info":
    await info();
    break;

  case "list-posts":
    await listPosts();
    break;

  case "create-post": {
    // Example: create a draft post
    const title = process.argv[3] || "Post de prueba desde la API";
    const content = process.argv[4] || "<p>Este post fue creado programáticamente desde el proyecto Next.js.</p>";
    await createPost({ title, content, status: "draft" });
    break;
  }

  case "update-hero": {
    const heading = process.argv[3] || "Creamos marcas que conectan y webs que convierten";
    const subheading = process.argv[4] || "Agencia creativa en Valencia. Branding, diseño web y estrategia digital.";
    await updateHomepageHero(heading, subheading);
    break;
  }

  default:
    console.log(`
WordPress API CLI — 4 de Junio

Usage:
  node scripts/wp-api.mjs test                              Test connection
  node scripts/wp-api.mjs info                              Site info (types, categories, pages)
  node scripts/wp-api.mjs list-posts                        List all posts
  node scripts/wp-api.mjs create-post "Title" "<p>HTML</p>" Create a draft post
  node scripts/wp-api.mjs update-hero "Heading" "Sub"       Update homepage hero text
    `);
}
