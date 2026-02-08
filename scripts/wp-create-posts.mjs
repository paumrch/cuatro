/**
 * Sequential WordPress content creator
 * Creates posts one at a time to avoid timeouts
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
const REST = `${WP_URL}/wp-json/wp/v2`;

const step = parseInt(process.argv[2]) || 0;

async function createPost(data) {
  const res = await fetch(`${REST}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: AUTH },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error("Error:", res.status, JSON.stringify(json).substring(0, 200));
    return null;
  }
  console.log(`✅ Published: ${json.id} | ${json.slug} | ${json.link}`);
  return json;
}

async function deletePost(id) {
  const res = await fetch(`${REST}/posts/${id}?force=true`, {
    method: "DELETE",
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
  });
  console.log(`🗑️  Delete ${id}: ${res.status}`);
}

async function listPosts() {
  const res = await fetch(`${REST}/posts?per_page=50&status=publish,draft,private`, {
    headers: { Authorization: AUTH },
  });
  const posts = await res.json();
  for (const p of posts) {
    console.log(`  ${p.id} | [${p.status}] ${p.slug} — ${p.title.rendered}`);
  }
}

const POSTS = [
  {
    title: "5 claves de un diseño web que realmente convierte",
    slug: "diseno-web-que-convierte",
    excerpt: "Tu web es tu mejor comercial. Pero solo si está diseñada para convertir visitantes en clientes.",
    content: `<p>Tener una web bonita no es suficiente. En 2025, una web tiene que trabajar por ti: atraer tráfico, generar confianza y convertir visitantes en clientes o leads.</p>
<h2>1. Claridad en los primeros 5 segundos</h2>
<p>Un visitante tarda entre 3 y 5 segundos en decidir si se queda o se va. Tu web tiene que responder: ¿Qué es esto? ¿Qué puedo hacer aquí? ¿Por qué debería confiar?</p>
<h2>2. Velocidad de carga</h2>
<p>Cada segundo extra de carga reduce la conversión un 7%. Utilizamos Next.js con renderizado estático e imágenes optimizadas para que las webs carguen en menos de 2 segundos.</p>
<h2>3. Diseño orientado a la acción</h2>
<p>Cada página necesita un objetivo claro. El diseño guía al usuario hacia esa acción de forma natural: jerarquía visual, CTAs visibles, formularios simples.</p>
<h2>4. Mobile-first, siempre</h2>
<p>Más del 60% del tráfico web viene de móvil. Cada elemento se piensa primero para pantallas pequeñas y después se escala.</p>
<h2>5. SEO desde el diseño</h2>
<p>La estructura de headings, los tiempos de carga, la arquitectura de URLs, los datos estructurados... todo se trabaja desde la fase de diseño.</p>
<p>¿Quieres una web que trabaje por ti? <a href="https://calendar.app.google/12L5HW9PUfJbCfrL8">Hablemos</a>.</p>`,
    status: "publish",
    categories: [1],
    tags: [3],
    meta: {
      rank_math_title: "5 Claves de un Diseño Web que Convierte | 4 de Junio",
      rank_math_description: "Descubre las 5 claves que aplicamos en cada proyecto web para convertir visitantes en clientes: claridad, velocidad, CTAs, mobile-first y SEO.",
      rank_math_focus_keyword: "diseño web que convierte",
    },
  },
  {
    title: "Por qué Valencia es el lugar perfecto para una agencia creativa",
    slug: "agencia-creativa-valencia",
    excerpt: "Valencia combina calidad de vida, talento y un ecosistema empresarial en crecimiento.",
    content: `<p>Cuando decidimos crear <strong>4 de Junio</strong>, teníamos claro que Valencia era el lugar. Esta ciudad tiene el equilibrio perfecto entre calidad de vida y oportunidad profesional.</p>
<h2>Un ecosistema creativo en ebullición</h2>
<p>Valencia se ha convertido en un hub creativo y tecnológico de referencia. La Valencia Digital Summit, el crecimiento de startups, la inversión en diseño y cultura... todo apunta en la misma dirección.</p>
<h2>Clientes que valoran la cercanía</h2>
<p>Trabajamos con empresas de toda España, pero la cercanía de sentarte con tu cliente y visitar su negocio es insustituible. Valencia nos conecta con un tejido empresarial diverso.</p>
<h2>Calidad de vida = mejor trabajo</h2>
<p>Cuando tu equipo vive bien, trabaja mejor. El clima, el mar, la gastronomía... todo influye en la creatividad. Las mejores ideas nacen cuando estás descansado e inspirado.</p>
<h2>El nombre lo dice todo</h2>
<p><strong>4 de Junio</strong> es el día que decidimos dar el paso. Crear algo propio, desde Valencia, con la ambición de hacer trabajo de primer nivel.</p>
<p>Si buscas una agencia creativa en Valencia, <a href="https://calendar.app.google/12L5HW9PUfJbCfrL8">reserva 30 minutos</a> y cuéntanos qué necesitas.</p>`,
    status: "publish",
    categories: [1],
    tags: [3],
    meta: {
      rank_math_title: "Agencia Creativa en Valencia — Por Qué Elegimos Esta Ciudad | 4 de Junio",
      rank_math_description: "Valencia combina talento, ecosistema empresarial y calidad de vida. Descubre por qué 4 de Junio eligió Valencia para crear una agencia de branding y diseño web.",
      rank_math_focus_keyword: "agencia creativa valencia",
    },
  },
  {
    title: "Estrategia digital para pymes: por dónde empezar",
    slug: "estrategia-digital-pymes",
    excerpt: "No necesitas un gran presupuesto para tener presencia digital efectiva. Te contamos los 4 pasos esenciales.",
    content: `<p>"Tenemos que estar en digital" es una frase que escuchamos constantemente. Pero muchas pymes no saben por dónde empezar y acaban invirtiendo en lo que no toca.</p>
<h2>Paso 1: Define tu propuesta de valor</h2>
<p>¿Qué problema resuelves? ¿Quién es tu cliente ideal? ¿Qué te diferencia? Sin esta base, cualquier inversión en marketing digital será ruido sin dirección.</p>
<h2>Paso 2: Tu web es tu base</h2>
<p>Las redes sociales son terreno alquilado. Tu web es terreno propio. Invierte primero en una web que explique qué haces, genere confianza y esté optimizada para SEO.</p>
<h2>Paso 3: Elige tus canales con criterio</h2>
<p>No necesitas estar en todas las redes. Necesitas estar donde está tu cliente. Menos canales, mejor ejecutados.</p>
<h2>Paso 4: Mide y ajusta</h2>
<p>Lo que no se mide, no se mejora. Configura Google Analytics y Search Console desde el primer día.</p>
<h2>El error más común</h2>
<p>Empezar por el final: invertir en publicidad sin tener una web que convierta. Es como poner gasolina en un coche sin motor.</p>
<p>¿No sabes por dónde empezar? <a href="https://calendar.app.google/12L5HW9PUfJbCfrL8">Agenda una llamada</a> y te orientamos.</p>`,
    status: "publish",
    categories: [1],
    tags: [3],
    meta: {
      rank_math_title: "Estrategia Digital para Pymes: Por Dónde Empezar | 4 de Junio",
      rank_math_description: "Descubre los 4 pasos esenciales de estrategia digital para pymes: propuesta de valor, web propia, canales adecuados y medición de resultados.",
      rank_math_focus_keyword: "estrategia digital pymes",
    },
  },
];

async function main() {
  if (step === 99) {
    console.log("📋 Listing all posts:");
    await listPosts();
    return;
  }

  if (step === 88) {
    // Clean up duplicates/drafts
    const toDelete = process.argv.slice(3).map(Number);
    for (const id of toDelete) {
      await deletePost(id);
    }
    return;
  }

  if (step >= 0 && step < POSTS.length) {
    console.log(`Creating post ${step + 1}/${POSTS.length}...`);
    await createPost(POSTS[step]);
  } else {
    console.log(`Usage: node wp-create-posts.mjs [0-${POSTS.length - 1}|99|88 id1 id2...]`);
  }
}

main().catch(console.error);
