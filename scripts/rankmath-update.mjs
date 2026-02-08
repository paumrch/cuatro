/**
 * Update RankMath SEO for all projects and posts
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

async function updateRankMathSEO(objectID, objectType, title, description, focusKeyword) {
  const res = await fetch(`${WP_URL}/wp-json/rankmath/v1/updateMeta`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: AUTH },
    body: JSON.stringify({
      objectID,
      objectType,
      meta: {
        rank_math_title: title,
        rank_math_description: description,
        rank_math_focus_keyword: focusKeyword || "",
      },
    }),
  });
  const data = await res.json();
  console.log(`  ${res.status === 200 ? "✅" : "❌"} ID:${objectID} → ${title.substring(0, 50)}...`);
  return data;
}

async function verifyViaGraphQL() {
  const gql = `{
    projects(first: 10) {
      edges { node { title slug seo { title description } } }
    }
    posts(first: 10) {
      edges { node { title slug status seo { title description } } }
    }
  }`;

  const res = await fetch(`${WP_URL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: AUTH },
    body: JSON.stringify({ query: gql }),
  });
  const data = await res.json();

  console.log("\n📊 Verificación — Proyectos:");
  for (const { node } of data.data.projects.edges) {
    const d = node.seo?.description;
    console.log(`  ${d ? "✅" : "❌"} ${node.slug}: ${(d || "SIN DESCRIPTION").substring(0, 80)}`);
  }

  console.log("\n📰 Verificación — Posts:");
  for (const { node } of data.data.posts.edges) {
    const d = node.seo?.description;
    console.log(`  ${d ? "✅" : "❌"} [${node.status}] ${node.slug}: ${(d || "SIN DESC").substring(0, 60)}`);
  }
}

const command = process.argv[2] || "all";

if (command === "all" || command === "projects") {
  console.log("═══ Actualizando SEO de Proyectos ═══\n");

  // KOME (ID: 57) - post type "project"
  await updateRankMathSEO(
    57, "post",
    "KOME — Branding para Restaurante Japonés | 4 de Junio",
    "Identidad de marca y desarrollo web para KOME, restaurante de cocina japonesa en Valencia. Naming, identidad visual y web a medida por 4 de Junio.",
    "branding restaurante"
  );

  // Proyecto Origen (ID: 60)
  await updateRankMathSEO(
    60, "post",
    "Proyecto Origen — Branding y Estrategia Digital | 4 de Junio",
    "Branding, estrategia digital y desarrollo web para Proyecto Origen. Identidad visual y narrativa de marca por 4 de Junio, agencia creativa en Valencia.",
    "branding estrategia digital"
  );

  // Paella Auténtica (ID: 55)
  await updateRankMathSEO(
    55, "post",
    "Paella Auténtica — Identidad de Marca | 4 de Junio",
    "Diseño de identidad visual y plataforma de marca para Paella Auténtica. Un proyecto de branding gastronómico por 4 de Junio, agencia creativa en Valencia.",
    "branding gastronómico"
  );

  // Decide Rocafort (ID: 41) - improve existing
  await updateRankMathSEO(
    41, "post",
    "Decide Rocafort — Participación Ciudadana | 4 de Junio",
    "El futuro es de todos. Plataforma digital de participación ciudadana para Rocafort. Branding, diseño y desarrollo web por 4 de Junio.",
    "participación ciudadana diseño web"
  );
}

if (command === "all" || command === "posts") {
  console.log("\n═══ Actualizando SEO de Posts ═══\n");

  // que-es-branding-empresa (ID: 141)
  await updateRankMathSEO(
    141, "post",
    "¿Qué es el Branding y Por Qué tu Empresa lo Necesita? | 4 de Junio",
    "El branding es mucho más que un logo. Descubre los 4 pilares de una identidad de marca sólida y por qué es la inversión más rentable para tu negocio.",
    "qué es branding"
  );

  // diseno-web-que-convierte (ID: 142)
  await updateRankMathSEO(
    142, "post",
    "5 Claves de un Diseño Web que Convierte | 4 de Junio",
    "Descubre las 5 claves que aplicamos en cada proyecto web para convertir visitantes en clientes: claridad, velocidad, CTAs, mobile-first y SEO integrado.",
    "diseño web que convierte"
  );

  // agencia-creativa-valencia (ID: 147)
  await updateRankMathSEO(
    147, "post",
    "Agencia Creativa en Valencia | 4 de Junio",
    "Valencia combina talento, ecosistema empresarial y calidad de vida. Descubre por qué 4 de Junio eligió Valencia para crear una agencia de branding y diseño web.",
    "agencia creativa valencia"
  );

  // estrategia-digital-pymes (ID: 148)
  await updateRankMathSEO(
    148, "post",
    "Estrategia Digital para Pymes: Por Dónde Empezar | 4 de Junio",
    "Los 4 pasos esenciales de estrategia digital para pymes: propuesta de valor, web propia, canales adecuados y medición de resultados.",
    "estrategia digital pymes"
  );
}

if (command === "all" || command === "verify") {
  console.log("\n═══ Verificación vía GraphQL ═══");
  await verifyViaGraphQL();
}

console.log("\n✅ Done!");
