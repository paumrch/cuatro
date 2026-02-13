import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const [key, ...val] = line.split("=");
  if (key && val.length) env[key.trim()] = val.join("=").trim();
});

const WP_URL = "https://wp.4dejunio.com";
const AUTH = "Basic " + Buffer.from(`${env.WP_AUTH_USER}:${env.WP_AUTH_APP_PASSWORD}`).toString("base64");

async function createPost({ title, slug, content }) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH,
    },
    body: JSON.stringify({
      title,
      slug,
      content,
      status: "publish",
      categories: [1], // Think Tank
      tags: [3],       // Home
    }),
  });
  const data = await res.json();
  if (data.id) {
    console.log(`✓ Post "${title}" creado (ID: ${data.id}, slug: ${data.slug})`);
  } else {
    console.error(`✗ Error creando "${title}":`, data);
  }
}

// Post 1 — IA para empresas
await createPost({
  title: "IA para empresas: cómo empezar sin complicarte",
  slug: "ia-para-empresas",
  content: `<p>La inteligencia artificial ya no es ciencia ficción ni algo reservado a grandes corporaciones. En 2025, <strong>cualquier empresa puede integrar IA en su día a día</strong> — y las que no lo hagan se quedarán atrás.</p>
<p>El problema es que la mayoría no sabe por dónde empezar. Hay demasiado ruido, demasiadas herramientas y demasiadas promesas. Aquí va nuestra visión práctica.</p>
<h2>No necesitas reinventar tu negocio</h2>
<p>El primer error es pensar que implementar IA significa transformar toda la empresa. No. Significa <strong>identificar tareas repetitivas que consumen tiempo</strong> y buscar formas de automatizarlas o mejorarlas.</p>
<p>Ejemplos reales que implementamos con nuestros clientes:</p>
<ul>
<li><strong>Atención al cliente</strong> — chatbots que resuelven el 70% de las consultas sin intervención humana</li>
<li><strong>Generación de contenido</strong> — borradores de posts, descripciones de producto y emails que tu equipo revisa y publica</li>
<li><strong>Análisis de datos</strong> — dashboards que interpretan tendencias y sugieren acciones</li>
<li><strong>Automatización de procesos</strong> — flujos que conectan herramientas y eliminan tareas manuales</li>
</ul>
<h2>Empieza por lo que duele</h2>
<p>¿Dónde pierde tiempo tu equipo? ¿Qué tareas se repiten cada semana sin aportar valor? Ahí es donde la IA genera impacto inmediato. <strong>No empieces por lo más complejo — empieza por lo que más duele</strong>.</p>
<h2>Herramientas vs. soluciones a medida</h2>
<p>A veces basta con integrar <strong>herramientas existentes</strong> como ChatGPT, Zapier o Make para resolver el problema. Otras veces necesitas algo construido específicamente para tu flujo de trabajo.</p>
<p>La clave está en entender qué necesitas antes de elegir la herramienta. La tecnología es el medio, no el fin.</p>
<h2>El factor humano</h2>
<p>La IA no sustituye a las personas — <strong>las libera para hacer trabajo que importa</strong>. El mejor resultado siempre es humano + máquina: la IA se encarga de lo repetitivo y tu equipo se centra en estrategia, creatividad y relaciones.</p>
<h2>Por dónde empezar</h2>
<p>Nuestro enfoque en <strong>4 de Junio</strong> es simple:</p>
<ul>
<li><strong>Auditoría</strong> — analizamos tus procesos y detectamos oportunidades de mejora</li>
<li><strong>Priorización</strong> — elegimos las implementaciones con mayor impacto y menor fricción</li>
<li><strong>Implementación</strong> — configuramos, integramos y formamos a tu equipo</li>
<li><strong>Iteración</strong> — medimos resultados y ajustamos</li>
</ul>
<p>Si quieres explorar cómo la IA puede ahorrarte tiempo y mejorar tus resultados, <a href="https://calendar.app.google/12L5HW9PUfJbCfrL8" target="_blank" rel="noopener">reserva una llamada</a> y te lo contamos sin compromiso.</p>`,
});

// Post 2 — SEO local Valencia
await createPost({
  title: "SEO local para negocios en Valencia: guía práctica",
  slug: "seo-local-valencia",
  content: `<p>Si tienes un negocio en Valencia y tus clientes potenciales te buscan en Google, <strong>el SEO local no es opcional — es tu mejor inversión</strong>. Aparecer en las primeras posiciones cuando alguien busca tu servicio en tu ciudad es la diferencia entre que te encuentren o que encuentren a tu competencia.</p>
<h2>¿Qué es el SEO local?</h2>
<p>Es el conjunto de estrategias para <strong>posicionar tu negocio en búsquedas geográficamente relevantes</strong>. Cuando alguien busca "diseño web Valencia" o "restaurante Ruzafa", Google muestra resultados locales. Si no apareces ahí, estás perdiendo clientes.</p>
<h2>Google Business Profile: tu base</h2>
<p>Todo empieza por tu ficha de <strong>Google Business Profile</strong> (antes Google My Business). Es gratuita y es lo primero que ve un usuario cuando busca tu negocio. Para optimizarla:</p>
<ul>
<li><strong>Completa toda la información</strong> — horarios, dirección, teléfono, web, categoría</li>
<li><strong>Fotos reales y actualizadas</strong> — el negocio, el equipo, los productos</li>
<li><strong>Responde a las reseñas</strong> — todas, las buenas y las malas</li>
<li><strong>Publica actualizaciones</strong> — ofertas, novedades, eventos</li>
</ul>
<h2>Tu web tiene que hablar de Valencia</h2>
<p>Google necesita señales claras de que tu negocio es relevante para búsquedas locales. Esto implica:</p>
<ul>
<li><strong>Incluir tu ubicación</strong> en titles, meta descriptions y headings</li>
<li><strong>Crear contenido local</strong> — páginas de servicios por zona, casos de éxito con clientes locales</li>
<li><strong>Datos estructurados</strong> — schema markup de LocalBusiness con dirección, teléfono y horarios</li>
<li><strong>NAP consistente</strong> — nombre, dirección y teléfono iguales en web, Google y directorios</li>
</ul>
<h2>Reseñas: el factor decisivo</h2>
<p><strong>El 87% de los consumidores lee reseñas online</strong> antes de elegir un negocio local. No es solo una cuestión de imagen — Google las usa como factor de ranking. Pide reseñas a clientes satisfechos, facilita el proceso y responde siempre.</p>
<h2>Contenido que posiciona</h2>
<p>Un blog con artículos relevantes para tu audiencia local refuerza tu autoridad. No necesitas publicar cada día — necesitas <strong>publicar con criterio</strong>. Un artículo bien trabajado al mes vale más que diez mediocres.</p>
<h2>Resultados reales</h2>
<p>El SEO local no da resultados de un día para otro, pero es <strong>acumulativo y sostenible</strong>. Una vez posicionado, cada visita es orgánica — sin coste por clic, sin depender de campañas de pago.</p>
<p>En <strong>4 de Junio</strong> ayudamos a negocios en Valencia a aparecer donde sus clientes los buscan. Si quieres saber cómo mejorar tu visibilidad local, <a href="https://calendar.app.google/12L5HW9PUfJbCfrL8" target="_blank" rel="noopener">agenda una reunión</a> y analizamos tu caso.</p>`,
});

console.log("\n✓ Posts creados");
