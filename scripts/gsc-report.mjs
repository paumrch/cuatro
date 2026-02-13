// =============================================================================
// Google Search Console — Data Fetcher
// Extrae datos de rendimiento de GSC vía API
// Uso: node scripts/gsc-report.mjs
// =============================================================================

import { google } from "googleapis";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------
const SITE_URL = "sc-domain:4dejunio.com"; // propiedad de dominio
const CREDENTIALS_PATH = resolve(ROOT, "cuatrodejunio-879dfa48f894.json");
const OUTPUT_DIR = resolve(ROOT, "scripts", "gsc-data");

// Rango de fechas
// Últimos 28 días como período actual, 28 días anteriores como comparación
const today = new Date();
const daysBack = (d, n) => {
  const r = new Date(d);
  r.setDate(r.getDate() - n);
  return r.toISOString().split("T")[0];
};

const CURRENT_END = daysBack(today, 3); // GSC tiene ~3 días de retraso
const CURRENT_START = daysBack(today, 30);
const PREVIOUS_END = daysBack(today, 31);
const PREVIOUS_START = daysBack(today, 58);

// -----------------------------------------------------------------------------
// Auth
// -----------------------------------------------------------------------------
async function getAuth() {
  const credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, "utf-8"));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  return auth;
}

// -----------------------------------------------------------------------------
// Query helper
// -----------------------------------------------------------------------------
async function queryGSC(webmasters, { startDate, endDate, dimensions, rowLimit = 1000, dimensionFilterGroups = [] }) {
  const res = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit,
      dimensionFilterGroups,
    },
  });
  return res.data.rows || [];
}

// -----------------------------------------------------------------------------
// Reportes
// -----------------------------------------------------------------------------
async function main() {
  console.log("🔑 Autenticando con Google Search Console...\n");
  const auth = await getAuth();
  const webmasters = google.webmasters({ version: "v3", auth });

  // Verificar acceso
  try {
    const sites = await webmasters.sites.list();
    const siteList = sites.data.siteEntry || [];
    const found = siteList.find((s) => s.siteUrl === SITE_URL);
    if (!found) {
      // Intentar con URL property
      const altUrl = "https://4dejunio.com/";
      const foundAlt = siteList.find((s) => s.siteUrl === altUrl);
      if (foundAlt) {
        console.log(`✅ Propiedad encontrada como URL: ${altUrl}`);
        // reemplazar a URL property
        Object.defineProperty(queryGSC, "SITE_URL", { value: altUrl });
      } else {
        console.log("⚠️  Propiedades disponibles:");
        siteList.forEach((s) => console.log(`   - ${s.siteUrl} (${s.permissionLevel})`));
        console.log(`\n❌ No se encontró "${SITE_URL}". Verifica que has añadido el service account como usuario.`);
        process.exit(1);
      }
    } else {
      console.log(`✅ Conectado a: ${SITE_URL} (${found.permissionLevel})\n`);
    }
  } catch (err) {
    console.error("❌ Error al listar sitios:", err.message);
    process.exit(1);
  }

  console.log(`📅 Período actual:   ${CURRENT_START} → ${CURRENT_END}`);
  console.log(`📅 Período anterior: ${PREVIOUS_START} → ${PREVIOUS_END}\n`);

  // --- 1. Queries (keywords) ---
  console.log("📊 Obteniendo top queries...");
  const queriesCurrent = await queryGSC(webmasters, {
    startDate: CURRENT_START,
    endDate: CURRENT_END,
    dimensions: ["query"],
    rowLimit: 500,
  });
  const queriesPrevious = await queryGSC(webmasters, {
    startDate: PREVIOUS_START,
    endDate: PREVIOUS_END,
    dimensions: ["query"],
    rowLimit: 500,
  });

  // --- 2. Páginas ---
  console.log("📊 Obteniendo top páginas...");
  const pagesCurrent = await queryGSC(webmasters, {
    startDate: CURRENT_START,
    endDate: CURRENT_END,
    dimensions: ["page"],
    rowLimit: 500,
  });
  const pagesPrevious = await queryGSC(webmasters, {
    startDate: PREVIOUS_START,
    endDate: PREVIOUS_END,
    dimensions: ["page"],
    rowLimit: 500,
  });

  // --- 3. Queries × Páginas ---
  console.log("📊 Obteniendo queries por página...");
  const queryPageCurrent = await queryGSC(webmasters, {
    startDate: CURRENT_START,
    endDate: CURRENT_END,
    dimensions: ["query", "page"],
    rowLimit: 1000,
  });

  // --- 4. Dispositivos ---
  console.log("📊 Obteniendo datos por dispositivo...");
  const devicesCurrent = await queryGSC(webmasters, {
    startDate: CURRENT_START,
    endDate: CURRENT_END,
    dimensions: ["device"],
  });

  // --- 5. Países ---
  console.log("📊 Obteniendo datos por país...");
  const countriesCurrent = await queryGSC(webmasters, {
    startDate: CURRENT_START,
    endDate: CURRENT_END,
    dimensions: ["country"],
    rowLimit: 20,
  });

  // --- 6. Fechas (evolución diaria) ---
  console.log("📊 Obteniendo evolución diaria...");
  const dailyCurrent = await queryGSC(webmasters, {
    startDate: CURRENT_START,
    endDate: CURRENT_END,
    dimensions: ["date"],
  });
  const dailyPrevious = await queryGSC(webmasters, {
    startDate: PREVIOUS_START,
    endDate: PREVIOUS_END,
    dimensions: ["date"],
  });

  // -----------------------------------------------------------------------------
  // Generar reporte
  // -----------------------------------------------------------------------------
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const report = {
    generatedAt: new Date().toISOString(),
    site: SITE_URL,
    periods: {
      current: { start: CURRENT_START, end: CURRENT_END },
      previous: { start: PREVIOUS_START, end: PREVIOUS_END },
    },
    summary: {
      current: summarize(queriesCurrent),
      previous: summarize(queriesPrevious),
    },
    queries: {
      current: formatRows(queriesCurrent, "query"),
      previous: formatRows(queriesPrevious, "query"),
    },
    pages: {
      current: formatRows(pagesCurrent, "page"),
      previous: formatRows(pagesPrevious, "page"),
    },
    queryByPage: formatMultiDimRows(queryPageCurrent, ["query", "page"]),
    devices: formatRows(devicesCurrent, "device"),
    countries: formatRows(countriesCurrent, "country"),
    daily: {
      current: formatRows(dailyCurrent, "date"),
      previous: formatRows(dailyPrevious, "date"),
    },
  };

  // Calcular deltas
  report.summary.delta = {
    clicks: report.summary.current.clicks - report.summary.previous.clicks,
    impressions: report.summary.current.impressions - report.summary.previous.impressions,
    ctr: +(report.summary.current.ctr - report.summary.previous.ctr).toFixed(4),
    position: +(report.summary.current.position - report.summary.previous.position).toFixed(1),
    clicksChange: report.summary.previous.clicks > 0
      ? +(((report.summary.current.clicks - report.summary.previous.clicks) / report.summary.previous.clicks) * 100).toFixed(1)
      : null,
    impressionsChange: report.summary.previous.impressions > 0
      ? +(((report.summary.current.impressions - report.summary.previous.impressions) / report.summary.previous.impressions) * 100).toFixed(1)
      : null,
  };

  const outputPath = resolve(OUTPUT_DIR, `gsc-report-${CURRENT_END}.json`);
  writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\n✅ Reporte guardado en: ${outputPath}\n`);

  // -----------------------------------------------------------------------------
  // Resumen en consola
  // -----------------------------------------------------------------------------
  printSummary(report);
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
function summarize(rows) {
  let clicks = 0, impressions = 0, ctrSum = 0, posSum = 0;
  for (const r of rows) {
    clicks += r.clicks;
    impressions += r.impressions;
    ctrSum += r.ctr * r.impressions;
    posSum += r.position * r.impressions;
  }
  return {
    clicks,
    impressions,
    ctr: impressions > 0 ? +(ctrSum / impressions).toFixed(4) : 0,
    position: impressions > 0 ? +(posSum / impressions).toFixed(1) : 0,
  };
}

function formatRows(rows, keyName) {
  return rows.map((r) => ({
    [keyName]: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: +(r.ctr * 100).toFixed(2),
    position: +r.position.toFixed(1),
  }));
}

function formatMultiDimRows(rows, keyNames) {
  return rows.map((r) => {
    const obj = {};
    keyNames.forEach((k, i) => (obj[k] = r.keys[i]));
    obj.clicks = r.clicks;
    obj.impressions = r.impressions;
    obj.ctr = +(r.ctr * 100).toFixed(2);
    obj.position = +r.position.toFixed(1);
    return obj;
  });
}

function printSummary(report) {
  const { current, previous, delta } = report.summary;

  console.log("═══════════════════════════════════════════════════════════");
  console.log("                    RESUMEN GSC");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`Período: ${report.periods.current.start} → ${report.periods.current.end}`);
  console.log(`vs.      ${report.periods.previous.start} → ${report.periods.previous.end}`);
  console.log("───────────────────────────────────────────────────────────");
  console.log(`Clics:        ${current.clicks.toLocaleString()} (${delta.clicksChange > 0 ? "+" : ""}${delta.clicksChange}%)`);
  console.log(`Impresiones:  ${current.impressions.toLocaleString()} (${delta.impressionsChange > 0 ? "+" : ""}${delta.impressionsChange}%)`);
  console.log(`CTR medio:    ${(current.ctr * 100).toFixed(2)}% (${delta.ctr > 0 ? "+" : ""}${(delta.ctr * 100).toFixed(2)}pp)`);
  console.log(`Posición media: ${current.position} (${delta.position > 0 ? "+" : ""}${delta.position})`);
  console.log("───────────────────────────────────────────────────────────");

  // Top 15 queries por clics
  console.log("\n🔍 TOP 15 QUERIES (por clics):");
  console.log("─────────────────────────────────────────────────────────────────────────");
  console.log("Query".padEnd(45) + "Clics".padStart(6) + "Impr.".padStart(8) + "CTR".padStart(7) + "Pos.".padStart(6));
  console.log("─────────────────────────────────────────────────────────────────────────");
  report.queries.current
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 15)
    .forEach((q) => {
      console.log(
        q.query.substring(0, 44).padEnd(45) +
        String(q.clicks).padStart(6) +
        String(q.impressions).padStart(8) +
        `${q.ctr}%`.padStart(7) +
        String(q.position).padStart(6)
      );
    });

  // Top 15 queries por impresiones
  console.log("\n👀 TOP 15 QUERIES (por impresiones):");
  console.log("─────────────────────────────────────────────────────────────────────────");
  console.log("Query".padEnd(45) + "Clics".padStart(6) + "Impr.".padStart(8) + "CTR".padStart(7) + "Pos.".padStart(6));
  console.log("─────────────────────────────────────────────────────────────────────────");
  report.queries.current
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)
    .forEach((q) => {
      console.log(
        q.query.substring(0, 44).padEnd(45) +
        String(q.clicks).padStart(6) +
        String(q.impressions).padStart(8) +
        `${q.ctr}%`.padStart(7) +
        String(q.position).padStart(6)
      );
    });

  // Top 10 páginas
  console.log("\n📄 TOP 10 PÁGINAS (por clics):");
  console.log("─────────────────────────────────────────────────────────────────────────────────");
  console.log("Página".padEnd(55) + "Clics".padStart(6) + "Impr.".padStart(8) + "CTR".padStart(7) + "Pos.".padStart(6));
  console.log("─────────────────────────────────────────────────────────────────────────────────");
  report.pages.current
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10)
    .forEach((p) => {
      const shortUrl = p.page.replace("https://4dejunio.com", "");
      console.log(
        (shortUrl || "/").substring(0, 54).padEnd(55) +
        String(p.clicks).padStart(6) +
        String(p.impressions).padStart(8) +
        `${p.ctr}%`.padStart(7) +
        String(p.position).padStart(6)
      );
    });

  // Dispositivos
  console.log("\n📱 DISPOSITIVOS:");
  report.devices.forEach((d) => {
    console.log(`  ${d.device.padEnd(10)} → ${d.clicks} clics, ${d.impressions} impresiones, CTR ${d.ctr}%, pos ${d.position}`);
  });

  // Países
  console.log("\n🌍 TOP PAÍSES:");
  report.countries.slice(0, 5).forEach((c) => {
    console.log(`  ${c.country.padEnd(5)} → ${c.clicks} clics, ${c.impressions} impresiones, CTR ${c.ctr}%, pos ${c.position}`);
  });

  console.log("\n═══════════════════════════════════════════════════════════\n");
}

// Run
main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
