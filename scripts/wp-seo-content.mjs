/**
 * WordPress SEO & Content Manager for 4 de Junio
 * Updates RankMath SEO fields and manages blog content
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

async function wpRest(endpoint, options = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${REST}${endpoint}`;
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
    console.error(`❌ Error ${res.status} on ${endpoint}:`, JSON.stringify(data).substring(0, 300));
    return null;
  }
  return data;
}

// ─── SEO: Update RankMath meta fields via REST API ───────

async function updateProjectSEO(projectId, title, description) {
  console.log(`\n🔍 Updating SEO for project ${projectId}...`);
  console.log(`   Title: "${title}"`);
  console.log(`   Description: "${description}"`);

  const data = await wpRest(`/project/${projectId}`, {
    method: "POST",
    body: JSON.stringify({
      meta: {
        rank_math_title: title,
        rank_math_description: description,
        rank_math_focus_keyword: "",
      },
    }),
  });

  if (data) {
    console.log(`   ✅ Project updated (ID: ${data.id})`);
  }
  return data;
}

async function updatePostSEO(postId, title, description) {
  console.log(`\n🔍 Updating SEO for post ${postId}...`);

  const data = await wpRest(`/posts/${postId}`, {
    method: "POST",
    body: JSON.stringify({
      meta: {
        rank_math_title: title,
        rank_math_description: description,
      },
    }),
  });

  if (data) {
    console.log(`   ✅ Post SEO updated (ID: ${data.id})`);
  }
  return data;
}

// ─── Blog: Create and publish posts ──────────────────────

async function createAndPublishPost({ title, slug, content, excerpt, status = "publish", categories = [], tags = [], rankTitle, rankDescription, rankKeyword }) {
  console.log(`\n📝 Creating post: "${title}" [${status}]`);

  const postData = {
    title,
    slug,
    content,
    excerpt,
    status,
  };

  if (categories.length) postData.categories = categories;
  if (tags.length) postData.tags = tags;

  // Include RankMath meta
  postData.meta = {};
  if (rankTitle) postData.meta.rank_math_title = rankTitle;
  if (rankDescription) postData.meta.rank_math_description = rankDescription;
  if (rankKeyword) postData.meta.rank_math_focus_keyword = rankKeyword;

  const post = await wpRest("/posts", {
    method: "POST",
    body: JSON.stringify(postData),
  });

  if (post) {
    console.log(`   ✅ Published! ID: ${post.id} | Slug: ${post.slug}`);
    console.log(`   URL: ${post.link}`);
  }
  return post;
}

// ─── MAIN: Execute all SEO updates and blog creation ─────

async function main() {
  const command = process.argv[2] || "all";

  if (command === "seo" || command === "all") {
    console.log("═══════════════════════════════════════");
    console.log("  📊 ACTUALIZANDO SEO DE PROYECTOS");
    console.log("═══════════════════════════════════════");

    // KOME (ID: 57)
    await updateProjectSEO(
      57,
      "KOME — Branding para Restaurante Japonés | 4 de Junio",
      "Identidad de marca y desarrollo web para KOME, restaurante de cocina japonesa en Valencia. Naming, identidad visual y web a medida por 4 de Junio."
    );

    // Proyecto Origen (ID: 60)
    await updateProjectSEO(
      60,
      "Proyecto Origen — Branding y Estrategia Digital | 4 de Junio",
      "Branding, estrategia digital y desarrollo web para Proyecto Origen. Identidad visual y narrativa de marca creada por 4 de Junio, agencia creativa en Valencia."
    );

    // Paella Auténtica (ID: 55)
    await updateProjectSEO(
      55,
      "Paella Auténtica — Identidad de Marca | 4 de Junio",
      "Diseño de identidad visual y plataforma de marca para Paella Auténtica. Un proyecto de branding gastronómico por 4 de Junio."
    );

    // Decide Rocafort (ID: 41) — ya tiene description, actualizamos título
    await updateProjectSEO(
      41,
      "Decide Rocafort — Branding y Web para Participación Ciudadana | 4 de Junio",
      "El futuro es de todos. La posibilidad de DECIDIR, también. Plataforma digital de participación ciudadana diseñada por 4 de Junio."
    );
  }

  if (command === "blog" || command === "all") {
    console.log("\n═══════════════════════════════════════");
    console.log("  📰 CREANDO Y PUBLICANDO BLOG POSTS");
    console.log("═══════════════════════════════════════");

    // Get or create Think Tank category (ID: 1)
    const categoryId = 1; // Think Tank
    // Get or create Home tag (ID: 3)
    const homeTagId = 3; // Home

    // ─── Post 1: Qué es el branding ───
    await createAndPublishPost({
      title: "¿Qué es el branding y por qué tu empresa lo necesita?",
      slug: "que-es-branding-empresa",
      excerpt: "El branding no es solo un logo. Es cómo te perciben, qué sienten y por qué te eligen. Te explicamos qué es y por qué es la base de todo negocio que quiere crecer.",
      content: `
<p>Cuando hablamos de branding, muchas personas piensan inmediatamente en un logo. Pero la identidad de marca va mucho más allá: es la suma de todas las percepciones, emociones y experiencias que una persona tiene con tu empresa.</p>

<h2>Branding no es un logo</h2>
<p>Un logo es solo la punta del iceberg. El branding engloba tu tono de voz, los colores que utilizas, la forma en que respondes un email, el diseño de tu web, cómo se siente un cliente al interactuar contigo. Es <strong>la promesa que haces y la experiencia que entregas</strong>.</p>

<p>Piensa en las marcas que admiras. Lo que te atrae no es solo su aspecto visual — es la coherencia entre lo que dicen, lo que hacen y cómo te hacen sentir.</p>

<h2>¿Por qué es importante para una empresa?</h2>
<p>En un mercado donde hay decenas de opciones para cualquier servicio, la marca es lo que te diferencia. Sin una identidad clara:</p>
<ul>
<li>Compites solo por precio (una carrera que nadie gana)</li>
<li>Tu audiencia no te recuerda</li>
<li>No generas confianza ni lealtad</li>
<li>Cada comunicación parte de cero, sin coherencia</li>
</ul>

<h2>Los pilares de una buena identidad de marca</h2>
<p>En <strong>4 de Junio</strong> trabajamos el branding desde cuatro pilares fundamentales:</p>

<h3>1. Estrategia</h3>
<p>Antes de diseñar nada, entendemos tu negocio, tu audiencia y tu competencia. Definimos el posicionamiento, los valores y la propuesta de valor que van a guiar todas las decisiones creativas.</p>

<h3>2. Identidad visual</h3>
<p>Logo, tipografía, paleta de colores, estilo fotográfico, iconografía. Todo diseñado como un sistema coherente que funciona en cualquier punto de contacto — desde una tarjeta de visita hasta una campaña digital.</p>

<h3>3. Tono de voz</h3>
<p>Cómo habla tu marca dice tanto como cómo se ve. Definimos un tono que conecte con tu audiencia y sea coherente en web, redes sociales, emails y presentaciones.</p>

<h3>4. Experiencia</h3>
<p>La marca cobra vida en cada interacción: el diseño de tu web, la velocidad de carga, la facilidad de contacto, el packaging, la atención al cliente. Todo suma (o resta).</p>

<h2>¿Cuándo es el momento de invertir en branding?</h2>
<p>Si estás lanzando un proyecto nuevo, reposicionando tu negocio o sientes que tu imagen actual no refleja lo que realmente eres — es el momento. Una buena inversión en marca es la decisión más rentable a medio y largo plazo.</p>

<p>En <strong>4 de Junio</strong> ayudamos a empresas en Valencia y en toda España a construir marcas con propósito. Si quieres saber cómo podemos ayudarte, <a href="https://calendar.app.google/12L5HW9PUfJbCfrL8">reserva una reunión</a> y hablamos sin compromiso.</p>
`,
      categories: [categoryId],
      tags: [homeTagId],
      rankTitle: "¿Qué es el Branding y Por Qué tu Empresa lo Necesita? | 4 de Junio",
      rankDescription: "El branding es mucho más que un logo. Descubre los 4 pilares de una identidad de marca sólida y por qué es la inversión más rentable para tu negocio.",
      rankKeyword: "qué es branding",
    });

    // ─── Post 2: Diseño web que convierte ───
    await createAndPublishPost({
      title: "5 claves de un diseño web que realmente convierte",
      slug: "diseno-web-que-convierte",
      excerpt: "Tu web es tu mejor comercial. Pero solo si está diseñada para convertir visitantes en clientes. Te contamos las 5 claves que aplicamos en cada proyecto.",
      content: `
<p>Tener una web bonita no es suficiente. En 2025, una web tiene que trabajar por ti: atraer tráfico, generar confianza y convertir visitantes en clientes o leads. Es tu escaparate digital 24/7.</p>

<p>Después de diseñar y desarrollar decenas de webs, estas son las 5 claves que aplicamos en <strong>4 de Junio</strong> para que cada proyecto funcione de verdad.</p>

<h2>1. Claridad en los primeros 5 segundos</h2>
<p>Un visitante tarda entre 3 y 5 segundos en decidir si se queda o se va. En ese tiempo, tu web tiene que responder tres preguntas:</p>
<ul>
<li><strong>¿Qué es esto?</strong> (qué ofreces)</li>
<li><strong>¿Qué puedo hacer aquí?</strong> (la acción principal)</li>
<li><strong>¿Por qué debería confiar?</strong> (prueba social o credenciales)</li>
</ul>
<p>Si tu hero no responde esto, estás perdiendo visitas.</p>

<h2>2. Velocidad de carga</h2>
<p>Cada segundo extra de carga reduce la conversión un 7%. No es solo una cuestión técnica — es dinero que pierdes. Utilizamos Next.js con renderizado estático, imágenes optimizadas y carga diferida para que las webs que creamos carguen en menos de 2 segundos.</p>

<h2>3. Diseño orientado a la acción</h2>
<p>Cada página necesita un objetivo claro. ¿Quieres que reserven una cita? ¿Que rellenen un formulario? ¿Que compren? El diseño tiene que guiar al usuario hacia esa acción de forma natural, sin fricciones.</p>
<p>Esto implica jerarquía visual, CTAs visibles, formularios simples y eliminar todo lo que distraiga del objetivo.</p>

<h2>4. Mobile-first, siempre</h2>
<p>Más del 60% del tráfico web viene de móvil. Diseñar primero para móvil no es una tendencia — es una obligación. Cada elemento que añadimos se piensa primero para pantallas pequeñas y después se escala.</p>

<h2>5. SEO desde el diseño</h2>
<p>El SEO no se añade después. La estructura de headings, los tiempos de carga, la arquitectura de URLs, los datos estructurados, los textos alternativos en imágenes... todo se trabaja desde la fase de diseño. Una web que no aparece en Google es una web que no existe.</p>

<h2>El resultado</h2>
<p>Cuando estas 5 claves se aplican juntas, el resultado es una web que no solo se ve bien — sino que genera negocio. Es la diferencia entre un portfolio online y una herramienta de ventas.</p>

<p>¿Quieres una web que trabaje por ti? <a href="https://calendar.app.google/12L5HW9PUfJbCfrL8">Hablemos</a>.</p>
`,
      categories: [categoryId],
      tags: [homeTagId],
      rankTitle: "5 Claves de un Diseño Web que Convierte Visitantes en Clientes | 4 de Junio",
      rankDescription: "Descubre las 5 claves que aplicamos en cada proyecto web para convertir visitantes en clientes: claridad, velocidad, CTAs, mobile-first y SEO integrado.",
      rankKeyword: "diseño web que convierte",
    });

    // ─── Post 3: Agencia creativa en Valencia ───
    await createAndPublishPost({
      title: "Por qué Valencia es el lugar perfecto para crear una agencia creativa",
      slug: "agencia-creativa-valencia",
      excerpt: "Valencia combina calidad de vida, talento y un ecosistema empresarial en crecimiento. Te contamos por qué elegimos esta ciudad para montar 4 de Junio.",
      content: `
<p>Cuando decidimos crear <strong>4 de Junio</strong>, teníamos claro que Valencia era el lugar. No por casualidad, sino por convicción. Esta ciudad tiene algo que pocas pueden ofrecer: el equilibrio perfecto entre calidad de vida y oportunidad profesional.</p>

<h2>Un ecosistema creativo en ebullición</h2>
<p>Valencia ha pasado de ser "la tercera ciudad de España" a convertirse en un hub creativo y tecnológico de referencia. La Valencia Digital Summit, el crecimiento de startups, la inversión en diseño y cultura... todo apunta en la misma dirección.</p>

<p>Para una agencia creativa, esto significa acceso a talento, eventos, colaboraciones y un tejido empresarial que entiende el valor del diseño y la comunicación digital.</p>

<h2>Clientes que valoran la cercanía</h2>
<p>Trabajamos con empresas de toda España y Europa, pero hay algo que la distancia no puede reemplazar: sentarte con tu cliente, visitar su negocio, entender su día a día. Valencia nos permite esa cercanía con un tejido empresarial diverso — desde restaurantes hasta instituciones, desde startups hasta pymes consolidadas.</p>

<h2>Calidad de vida = mejor trabajo</h2>
<p>No es un cliché. Cuando tu equipo vive bien, trabaja mejor. El clima, el mar, la gastronomía, el ritmo de vida... todo influye en la creatividad. Las mejores ideas no nacen en una oficina gris a las 22:00 — nacen cuando estás descansado, inspirado y conectado con tu entorno.</p>

<h2>El nombre lo dice todo</h2>
<p><strong>4 de Junio</strong> no es una fecha aleatoria. Es el día que decidimos dar el paso. Crear algo propio, desde Valencia, con la ambición de hacer trabajo de primer nivel sin perder la cercanía y el toque humano que nos define.</p>

<p>Si buscas una agencia creativa en Valencia que entienda tu proyecto y lo haga crecer, estamos aquí. <a href="https://calendar.app.google/12L5HW9PUfJbCfrL8">Reserva 30 minutos</a> y cuéntanos qué necesitas.</p>
`,
      categories: [categoryId],
      tags: [homeTagId],
      rankTitle: "Agencia Creativa en Valencia — Por Qué Elegimos Esta Ciudad | 4 de Junio",
      rankDescription: "Valencia combina talento, ecosistema empresarial y calidad de vida. Descubre por qué 4 de Junio eligió Valencia para crear una agencia de branding y diseño web.",
      rankKeyword: "agencia creativa valencia",
    });

    // ─── Post 4: Estrategia digital para pymes ───
    await createAndPublishPost({
      title: "Estrategia digital para pymes: por dónde empezar sin morir en el intento",
      slug: "estrategia-digital-pymes",
      excerpt: "No necesitas un gran presupuesto para tener presencia digital efectiva. Te contamos los 4 pasos esenciales para que tu pyme empiece a competir online.",
      content: `
<p>"Tenemos que estar en digital" es una frase que escuchamos constantemente. Pero la realidad es que muchas pymes no saben por dónde empezar — y acaban invirtiendo en lo que no toca, en el orden equivocado.</p>

<p>Después de trabajar con empresas de todos los tamaños, hemos destilado un camino claro para que cualquier pyme empiece a construir su presencia digital con sentido.</p>

<h2>Paso 1: Define tu propuesta de valor</h2>
<p>Antes de abrir Instagram o diseñar una web, necesitas tener claro qué ofreces, a quién y por qué deberían elegirte a ti. Sin esta base, cualquier inversión en marketing digital será ruido sin dirección.</p>
<p>Preguntas clave:</p>
<ul>
<li>¿Qué problema resuelves?</li>
<li>¿Quién es tu cliente ideal?</li>
<li>¿Qué te diferencia de la competencia?</li>
</ul>

<h2>Paso 2: Tu web es tu base</h2>
<p>Las redes sociales son terreno alquilado. Tu web es terreno propio. Es el único espacio digital donde controlas el mensaje, la experiencia y los datos. Invierte primero en una web que:</p>
<ul>
<li>Explique claramente qué haces</li>
<li>Genere confianza (testimonios, casos reales, fotos propias)</li>
<li>Tenga un camino claro hacia la conversión</li>
<li>Esté optimizada para SEO (aparecer en Google es gratis, pero requiere trabajo)</li>
</ul>

<h2>Paso 3: Elige tus canales con criterio</h2>
<p>No necesitas estar en todas las redes. Necesitas estar donde está tu cliente. Si vendes B2B, LinkedIn probablemente sea más útil que TikTok. Si tienes un restaurante, Instagram y Google Maps son tu prioridad.</p>
<p>La clave: <strong>menos canales, mejor ejecutados</strong>. Es preferible un canal bien trabajado que cinco abandonados.</p>

<h2>Paso 4: Mide y ajusta</h2>
<p>Lo que no se mide, no se mejora. Configura Google Analytics, Google Search Console y el píxel de tus campañas desde el primer día. Revisa los datos mensualmente y ajusta tu estrategia en función de lo que funciona.</p>

<h2>El error más común</h2>
<p>Empezar por el final: invertir en publicidad de pago sin tener una web que convierta, sin tener claro el mensaje, sin saber a quién te diriges. Es como poner gasolina en un coche sin motor.</p>

<p>En <strong>4 de Junio</strong> ayudamos a pymes a construir su presencia digital paso a paso, desde la estrategia hasta la ejecución. Si no sabes por dónde empezar, <a href="https://calendar.app.google/12L5HW9PUfJbCfrL8">agenda una llamada</a> y te orientamos sin compromiso.</p>
`,
      categories: [categoryId],
      tags: [homeTagId],
      rankTitle: "Estrategia Digital para Pymes: Por Dónde Empezar | 4 de Junio",
      rankDescription: "No necesitas un gran presupuesto para competir online. Descubre los 4 pasos esenciales de estrategia digital para pymes: propuesta de valor, web, canales y medición.",
      rankKeyword: "estrategia digital pymes",
    });

    // ─── Clean up old draft posts ───
    console.log("\n🗑️  Cleaning up old draft posts...");
    const draftsToDelete = [140, 67, 94, 97, 100]; // Post de prueba API + Día 1-4
    for (const id of draftsToDelete) {
      try {
        const res = await fetch(`${REST}/posts/${id}`, {
          method: "DELETE",
          headers: { Authorization: AUTH, "Content-Type": "application/json" },
          body: JSON.stringify({ force: true }),
        });
        if (res.ok) {
          console.log(`   ✅ Deleted draft post ${id}`);
        } else {
          console.log(`   ⚠️  Could not delete post ${id}: ${res.status}`);
        }
      } catch (e) {
        console.log(`   ⚠️  Error deleting ${id}: ${e.message}`);
      }
    }
  }

  if (command === "verify" || command === "all") {
    console.log("\n═══════════════════════════════════════");
    console.log("  ✅ VERIFICACIÓN");
    console.log("═══════════════════════════════════════");

    // Verify projects SEO via GraphQL
    const gql = `{
      projects(first: 10) {
        edges {
          node {
            title
            slug
            seo { title description }
          }
        }
      }
      posts(first: 10) {
        edges {
          node {
            title
            slug
            status
            seo { title description }
          }
        }
      }
    }`;

    const res = await fetch(`${WP_URL}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: AUTH },
      body: JSON.stringify({ query: gql }),
    });
    const data = await res.json();

    console.log("\n📊 Proyectos:");
    for (const { node } of data.data.projects.edges) {
      const desc = node.seo?.description || "⚠️ SIN DESCRIPTION";
      console.log(`  ${node.slug}: ${desc.substring(0, 80)}...`);
    }

    console.log("\n📰 Posts:");
    for (const { node } of data.data.posts.edges) {
      console.log(`  [${node.status || "?"}] ${node.slug}: ${node.seo?.title || node.title}`);
    }
  }

  console.log("\n✅ Done!");
}

main().catch(console.error);
