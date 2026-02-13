# MEMORY — 4 de Junio

## Proyecto

Web corporativa de **4 de Junio**, agencia creativa con sede en Valencia (España). Fundada por Pau March.  
URL de producción: `https://4dejunio.com`

### Servicios que ofrece la agencia

- Branding
- Diseño y desarrollo web
- Implementación de IA
- Automatizaciones
- Paid Media
- Posicionamiento SEO

### Contacto

- Email: hola@4dejunio.com
- Oficina: Pasaje Dr. Bartual Moret 8 - 6, 46010, Valencia
- LinkedIn: linkedin.com/company/4dejunio/
- Instagram: instagram.com/4dejunio_
- Reuniones: Google Calendar link

---

## Stack técnico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 14.1.4 |
| UI | React | 18 |
| Styling | Tailwind CSS | 3.x |
| CMS | WordPress (headless) | — |
| API | WPGraphQL | GraphQL |
| Animaciones | GSAP + Framer Motion | gsap 3.x / framer-motion 11.x |
| Scroll | Lenis (smooth scroll) | 1.3.x |
| Iconos | Heroicons | 2.x |
| Formularios | @tailwindcss/forms | 0.5.x |
| Analytics | Vercel Analytics | 1.3.x |
| Fechas | Intl.DateTimeFormat | nativo |
| Deploy | Vercel (implícito) | — |

---

## Variables de entorno

Definidas en `.env.local` (no commiteado):

```
WORDPRESS_API_URL=https://wp.4dejunio.com/graphql
WORDPRESS_AUTH_REFRESH_TOKEN=<opcional, para previews>
```

---

## Estructura del proyecto

```
src/
├── app/                    # App Router (páginas)
│   ├── layout.js           # RootLayout — fuente local, metadata global, JsonLd, SmoothScrolling, Transition
│   ├── page.js             # Homepage — Hero, FeaturedProjects, Services, About, Blog
│   ├── error.js            # Error boundary ("use client")
│   ├── sitemap.js          # Sitemap dinámico (posts + projects + servicios pSEO)
│   ├── globals.css         # Tailwind base + estilos .post-content
│   ├── fonts/              # BasisGrotesquePro (local, múltiples pesos)
│   ├── blog/
│   │   ├── page.jsx        # Índice del blog — getAllPublishedPosts()
│   │   └── [slug]/page.jsx # Post individual — getPostAndMorePosts(), generateStaticParams
│   ├── work/
│   │   ├── page.jsx        # Índice de proyectos — getProjectsData()
│   │   └── [slug]/page.jsx # Proyecto individual — getProjectAndMoreProjects(), generateStaticParams
│   ├── servicios/
│   │   ├── page.jsx        # Índice de servicios — datos de pseo-data.js
│   │   ├── [service]/page.jsx      # Servicio individual (pSEO) — generateStaticParams
│   │   └── [service]/[modifier]/page.jsx  # Servicio × Ciudad/Sector (pSEO) — generateStaticParams
│   └── legal/page.jsx      # Aviso legal y privacidad (estática)
│
├── components/
│   ├── navbar.jsx           # "use client" — logo SVG remoto, reloj en vivo, animación GSAP
│   ├── hero.jsx             # Server Component — heading/subheading desde WP + AnimatedVideo
│   ├── featuredProjects.jsx # Server Component — grid de proyectos desde WP
│   ├── services.jsx         # Server Component — listado de servicios con links
│   ├── about.jsx            # Server Component — sección "Nosotros" + equipo
│   ├── blog.jsx             # Server Component — posts para home (carrusel móvil + grid)
│   ├── footer.jsx           # Server Component — CTA reunión + datos de contacto
│   ├── meeting.jsx          # Botón "Agendar reunión" (Google Calendar)
│   ├── copyright.jsx        # Redes sociales + copyright
│   ├── subscribe.jsx        # Formulario de suscripción (sin backend conectado)
│   ├── time.jsx             # "use client" — reloj en tiempo real (navbar)
│   ├── smoothScrolling.jsx  # "use client" — ReactLenis wrapper
│   ├── transition.jsx       # "use client" — Framer Motion page transition
│   ├── AnimatedElement.jsx  # "use client" — wrapper GSAP genérico
│   ├── JsonLd.jsx           # Structured data helpers (Organization, Article, CreativeWork, Breadcrumb, WebSite)
│   └── animated/
│       └── AnimatedVideo.jsx # "use client" — video hero con animación GSAP
│
├── lib/
│   ├── api.js               # Todas las queries WPGraphQL (fetchAPI con revalidate = 3600)
│   ├── constants.js          # Constantes (poco usado)
│   └── pseo-data.js          # Datos programáticos SEO: servicios, ciudades, sectores + helpers
│
├── utils/
│   └── decodeHTMLEntities.js # Decodifica entidades HTML (&mdash;, etc.)
│
scripts/                      # Scripts auxiliares Node.js para WordPress
├── wp-api.mjs               # Cliente REST API WordPress
├── wp-create-posts.mjs      # Creación de posts vía WP REST
├── wp-seo-content.mjs       # Generación de contenido SEO
├── inspect-seo.mjs          # Inspección SEO
├── rankmath-test.mjs        # Tests de RankMath
└── rankmath-update.mjs      # Actualización de metadatos RankMath
```

---

## Arquitectura y patrones clave

### Headless WordPress

- WordPress en `wp.4dejunio.com` como CMS headless.
- Comunicación mediante **WPGraphQL** (endpoint `/graphql`).
- SEO gestionado con **RankMath** en WordPress (campos `seo` en las queries GraphQL).
- Custom Post Types: `Post` (blog), `Project` (portfolio), `Page` (homepage data con ACF field group `home`).
- Revalidación ISR cada **3600 segundos** (1 hora).

### Programmatic SEO (pSEO)

- Archivo central: `src/lib/pseo-data.js` (855 líneas).
- Genera páginas combinatorias: **Servicio × Ciudad** y **Servicio × Sector**.
- 6 servicios × N ciudades × N sectores = cientos de landing pages.
- Rutas: `/servicios/[service]` y `/servicios/[service]/[modifier]`.
- Cada servicio tiene: `metaTitle`, `metaDescription`, `heroHeading`, `heroSubheading`, `intro`, `body` (HTML), `benefits`, `process`, `faq`.
- JSON-LD automático: `Service`, `FAQPage`, `BreadcrumbList`.
- Función `getAllServiceUrls()` alimenta el sitemap dinámico.

### SEO y Structured Data

- `JsonLd.jsx` centraliza todos los datos estructurados.
- Tipos implementados: `Organization`, `WebSite`, `Article`, `CreativeWork`, `FAQPage`, `BreadcrumbList`, `Service`.
- Metadata dinámica con `generateMetadata()` en cada ruta.
- Canonical URLs explícitas en todas las páginas.
- OpenGraph y Twitter Cards configurados.
- `robots.txt` permite todo excepto `/api/` y `/_next/`.
- Sitemap generado dinámicamente desde posts, proyectos y páginas pSEO.

### Frontend y UX

- **Fuente**: Basis Grotesque Pro (local, woff2, pesos 300-900) con `display: swap`.
- **Paleta**: stone (Tailwind) — fondo `bg-stone-50`, texto `text-stone-900`.
- **Idioma**: `es` (html lang).
- **Smooth scroll**: Lenis (lerp: 0.1, duration: 1.5).
- **Page transitions**: Framer Motion (fade-in con desplazamiento Y).
- **Animaciones de entrada**: GSAP (navbar, hero video, elementos genéricos).
- **Layout responsivo**: Mobile-first con breakpoints Tailwind estándar.
- **Blog móvil**: Carrusel horizontal con scroll; grid en desktop.

---

## Convenciones de código

- **Extensiones**: `.js` para páginas y config, `.jsx` para componentes.
- **Imports**: Alias `@/*` → `./src/*` (configurado en jsconfig.json).
- **Client components**: Marcados explícitamente con `"use client"` (navbar, time, smoothScrolling, transition, AnimatedElement, AnimatedVideo).
- **Server components**: Por defecto (hero, services, blog, footer, about, featuredProjects).
- **Metadata**: `generateMetadata()` async para rutas dinámicas; objeto estático `metadata` para rutas fijas.
- **Data fetching**: Server Components con funciones de `lib/api.js` (no hooks, no useEffect para data).
- **Estilos**: Utility-first Tailwind. Clases de componente solo en `.post-content` (globals.css).
- **Comentarios**: En español.
- **No TypeScript**: Proyecto 100% JavaScript.

---

## Comandos

```bash
npm run dev      # Servidor de desarrollo (localhost:3000)
npm run build    # Build de producción
npm run start    # Sirve el build de producción
npm run lint     # ESLint
```

---

## Notas importantes

- El formulario de suscripción (`subscribe.jsx`) no tiene backend conectado.
- El logo se carga desde `wp.4dejunio.com` (SVG remoto), no es un asset local.
- El video del hero (`/cuatro.mp4`) está en `public/`.
- Los scripts en `scripts/` son utilidades independientes para gestión de contenido WordPress vía REST API, no forman parte del build de Next.js.
- La fuente Basis Grotesque Pro es propietaria (no Google Fonts).

---

## Dominios y redirects

- **Dominio principal**: `4dejunio.com` (Vercel).
- **Redirects 308 (permanentes)** configurados en `next.config.mjs`:
  - `cuatrodejunio.com/*` → `https://4dejunio.com/*`
  - `www.cuatrodejunio.com/*` → `https://4dejunio.com/*`
  - `www.4dejunio.com/*` → `https://4dejunio.com/*`
- Todos los dominios añadidos en el proyecto Vercel con SSL activo.

---

## Google Search Console

- **Propiedad verificada**: `4dejunio.com` (service account `cuatro@cuatrodejunio.iam.gserviceaccount.com`).
- **Script de consulta**: `scripts/gsc-report.mjs` — genera informe JSON + resumen en consola.
- **Credenciales**: `cuatrodejunio-879dfa48f894.json` (gitignored).
- **Estado (feb 2025)**: Fase temprana de indexación. 39 impresiones, 0 clics. Páginas pSEO de branding empezando a indexar.

---

## Auditoría Web Interface Guidelines (feb 2025)

Auditoría completada y todos los fixes aplicados:

- **Accesibilidad**: skip link, `<main>` landmark, `footer-heading` sr-only, `aria-hidden` en iconos decorativos, `focus-visible` rings.
- **Reduced motion**: respetado globalmente en GSAP, Framer Motion, Lenis y autoplay de vídeo.
- **Tipografía**: `text-wrap: balance` en todos los `<h1>`.
- **Fechas**: migradas de `date-fns` a `Intl.DateTimeFormat("es-ES")`.
- **Transiciones**: `transition` → `transition-colors` (especificidad correcta).
- **Performance**: `preconnect` a `wp.4dejunio.com`, `theme-color` meta.
- **Código muerto eliminado**: `navigation` const en meeting.jsx, `type="button"` en div.
- **Mejoras UX**: placeholder de email mejorado, `spellCheck={false}` en input email, `<a>` → `<Link>` en footer.
