import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import JsonLd, { getBreadcrumbJsonLd } from "@/components/JsonLd";
import {
  services,
  cities,
  sectors,
  getModifierType,
  getAllServiceModifierParams,
  getServiceCityTitle,
  getServiceCityDescription,
  getServiceSectorTitle,
  getServiceSectorDescription,
  getServiceJsonLd,
} from "@/lib/pseo-data";

export async function generateMetadata({ params }) {
  const { service: serviceSlug, modifier: modifierSlug } = params;
  const service = services[serviceSlug];
  if (!service) return { title: "Página no encontrada" };

  const type = getModifierType(modifierSlug);
  if (!type) return { title: "Página no encontrada" };

  const modifier = type === "city" ? cities[modifierSlug] : sectors[modifierSlug];
  const title = type === "city"
    ? getServiceCityTitle(service, modifier)
    : getServiceSectorTitle(service, modifier);
  const description = type === "city"
    ? getServiceCityDescription(service, modifier)
    : getServiceSectorDescription(service, modifier);

  return {
    title,
    description,
    alternates: {
      canonical: `https://4dejunio.com/servicios/${service.slug}/${modifier.slug}`,
    },
    openGraph: {
      title: `${title} | 4 de Junio`,
      description,
      url: `https://4dejunio.com/servicios/${service.slug}/${modifier.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return getAllServiceModifierParams();
}

export default function ServiceModifierPage({ params }) {
  const { service: serviceSlug, modifier: modifierSlug } = params;
  const service = services[serviceSlug];
  if (!service) notFound();

  const type = getModifierType(modifierSlug);
  if (!type) notFound();

  if (type === "city") {
    return <ServiceCityPage service={service} city={cities[modifierSlug]} />;
  }

  return <ServiceSectorPage service={service} sector={sectors[modifierSlug]} />;
}

// =============================================================================
// SERVICE × CITY
// =============================================================================
function ServiceCityPage({ service, city }) {
  const otherCities = Object.values(cities).filter(
    (c) => c.slug !== city.slug
  );
  const otherServices = Object.values(services).filter(
    (s) => s.slug !== service.slug
  );

  return (
    <>
      <JsonLd data={getServiceJsonLd(service, city)} />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Inicio", url: "https://4dejunio.com" },
          { name: "Servicios", url: "https://4dejunio.com/servicios" },
          {
            name: service.name,
            url: `https://4dejunio.com/servicios/${service.slug}`,
          },
          {
            name: city.name,
            url: `https://4dejunio.com/servicios/${service.slug}/${city.slug}`,
          },
        ])}
      />

      <Navbar />

      <div className="mx-auto px-6 pb-8 lg:px-8">
        <div className="relative isolate pt-14">
          <div className="py-12 sm:py-18 lg:pb-20">
            <div className="mx-auto max-w-screen-md">
              {/* Breadcrumb */}
              <nav className="text-sm text-stone-500 mb-8">
                <Link href="/" className="hover:text-stone-900">
                  Inicio
                </Link>
                {" / "}
                <Link href="/servicios" className="hover:text-stone-900">
                  Servicios
                </Link>
                {" / "}
                <Link
                  href={`/servicios/${service.slug}`}
                  className="hover:text-stone-900"
                >
                  {service.name}
                </Link>
                {" / "}
                <span className="text-stone-900">{city.name}</span>
              </nav>

              {/* Hero */}
              <div className="mb-12">
                <span className="text-3xl">{service.icon}</span>
                <h1 className="text-3xl sm:text-4xl font-semibold mt-4 tracking-tight">
                  {service.name} {city.preposition}
                </h1>
                <p className="mt-4 text-lg text-stone-600">
                  {service.heroSubheading}
                </p>
              </div>

              {/* City Context */}
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 mb-10">
                <h2 className="font-semibold text-lg mb-2">
                  El mercado digital {city.preposition}
                </h2>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {city.context}
                </p>
              </div>

              {/* Service Intro adapted to city */}
              <p className="text-base text-stone-700 leading-relaxed mb-6">
                {service.intro}
              </p>
              <p className="text-base text-stone-700 leading-relaxed mb-10">
                {city.businessFocus}
              </p>

              {/* Body Content */}
              <div
                className="prose lg:prose-lg prose-stone mx-auto mb-16"
                dangerouslySetInnerHTML={{ __html: service.body }}
              />

              {/* Benefits */}
              <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">
                  Qué vas a conseguir con {service.shortName}{" "}
                  {city.preposition}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="border border-stone-200 rounded-lg p-6"
                    >
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="mt-2 text-sm text-stone-600">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Process */}
              <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">
                  Cómo trabajamos
                </h2>
                <div className="space-y-4">
                  {service.process.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold">{step.step}</h3>
                        <p className="text-sm text-stone-600 mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">
                  Preguntas frecuentes sobre {service.shortName}{" "}
                  {city.preposition}
                </h2>
                <div className="space-y-4">
                  {service.faq.map((item, i) => (
                    <details
                      key={i}
                      className="border border-stone-200 rounded-lg p-4 group"
                    >
                      <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                        {item.q}
                        <span className="text-stone-400 group-open:rotate-45 transition-transform text-xl">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-stone-600">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Internal Links — Same service, other cities */}
              <section className="mb-8 border-t border-stone-200 pt-10">
                <h2 className="text-lg font-semibold mb-4">
                  {service.name} en otras ciudades
                </h2>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/servicios/${service.slug}/${c.slug}`}
                      className="text-sm bg-stone-100 hover:bg-stone-200 rounded-full px-3 py-1.5 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Internal Links — Other services in same city */}
              <section className="mb-16">
                <h2 className="text-lg font-semibold mb-4">
                  Otros servicios {city.preposition}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {otherServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/servicios/${s.slug}/${city.slug}`}
                      className="text-sm bg-stone-100 hover:bg-stone-200 rounded-full px-3 py-1.5 transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div className="text-center border-t border-stone-200 pt-12">
                <h2 className="text-2xl font-semibold">
                  ¿Necesitas {service.shortName.toLowerCase()}{" "}
                  {city.preposition}?
                </h2>
                <p className="mt-3 text-stone-600">
                  Cuéntanos tu proyecto y te preparamos una propuesta
                  personalizada.
                </p>
                <Link
                  href="https://calendar.app.google/12L5HW9PUfJbCfrL8"
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-6 rounded-md bg-stone-900 px-6 py-3 text-sm text-white hover:bg-stone-700 transition-colors"
                >
                  <span className="h-2 w-2 bg-emerald-400 rounded-full" />
                  Agendar reunión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// =============================================================================
// SERVICE × SECTOR
// =============================================================================
function ServiceSectorPage({ service, sector }) {
  const otherSectors = Object.values(sectors).filter(
    (s) => s.slug !== sector.slug
  );
  const otherServices = Object.values(services).filter(
    (s) => s.slug !== service.slug
  );

  return (
    <>
      <JsonLd data={getServiceJsonLd(service, sector)} />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Inicio", url: "https://4dejunio.com" },
          { name: "Servicios", url: "https://4dejunio.com/servicios" },
          {
            name: service.name,
            url: `https://4dejunio.com/servicios/${service.slug}`,
          },
          {
            name: sector.name,
            url: `https://4dejunio.com/servicios/${service.slug}/${sector.slug}`,
          },
        ])}
      />

      <Navbar />

      <div className="mx-auto px-6 pb-8 lg:px-8">
        <div className="relative isolate pt-14">
          <div className="py-12 sm:py-18 lg:pb-20">
            <div className="mx-auto max-w-screen-md">
              {/* Breadcrumb */}
              <nav className="text-sm text-stone-500 mb-8">
                <Link href="/" className="hover:text-stone-900">
                  Inicio
                </Link>
                {" / "}
                <Link href="/servicios" className="hover:text-stone-900">
                  Servicios
                </Link>
                {" / "}
                <Link
                  href={`/servicios/${service.slug}`}
                  className="hover:text-stone-900"
                >
                  {service.name}
                </Link>
                {" / "}
                <span className="text-stone-900">{sector.name}</span>
              </nav>

              {/* Hero */}
              <div className="mb-12">
                <span className="text-3xl">{service.icon}</span>
                <h1 className="text-3xl sm:text-4xl font-semibold mt-4 tracking-tight">
                  {service.name} {sector.preposition}
                </h1>
                <p className="mt-4 text-lg text-stone-600">
                  {sector.intro}
                </p>
              </div>

              {/* Sector Challenges */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">
                  Retos del {sector.name.toLowerCase()} que resolvemos
                </h2>
                <ul className="space-y-3">
                  {sector.challenges.map((challenge, i) => (
                    <li
                      key={i}
                      className="flex gap-3 items-start text-stone-700"
                    >
                      <span className="flex-shrink-0 w-5 h-5 mt-0.5 bg-stone-200 rounded-full flex items-center justify-center text-xs">
                        ✕
                      </span>
                      <span className="text-sm leading-relaxed">
                        {challenge}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* How we solve it — service body */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">
                  Cómo {service.shortName.toLowerCase()} resuelve estos retos
                </h2>
                <p className="text-base text-stone-700 leading-relaxed mb-6">
                  {service.intro}
                </p>
              </section>

              {/* Body Content */}
              <div
                className="prose lg:prose-lg prose-stone mx-auto mb-16"
                dangerouslySetInnerHTML={{ __html: service.body }}
              />

              {/* Expected Outcomes */}
              <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">
                  Lo que puedes esperar
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sector.outcomes.map((outcome, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start border border-stone-200 rounded-lg p-5"
                    >
                      <span className="flex-shrink-0 text-emerald-600 mt-0.5">
                        ✓
                      </span>
                      <span className="text-sm text-stone-700">{outcome}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Process */}
              <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">
                  Cómo trabajamos
                </h2>
                <div className="space-y-4">
                  {service.process.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold">{step.step}</h3>
                        <p className="text-sm text-stone-600 mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">
                  Preguntas frecuentes
                </h2>
                <div className="space-y-4">
                  {service.faq.map((item, i) => (
                    <details
                      key={i}
                      className="border border-stone-200 rounded-lg p-4 group"
                    >
                      <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                        {item.q}
                        <span className="text-stone-400 group-open:rotate-45 transition-transform text-xl">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-stone-600">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Internal Links — Same service, other sectors */}
              <section className="mb-8 border-t border-stone-200 pt-10">
                <h2 className="text-lg font-semibold mb-4">
                  {service.name} en otros sectores
                </h2>
                <div className="flex flex-wrap gap-2">
                  {otherSectors.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/servicios/${service.slug}/${s.slug}`}
                      className="text-sm bg-stone-100 hover:bg-stone-200 rounded-full px-3 py-1.5 transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Internal Links — Other services for same sector */}
              <section className="mb-16">
                <h2 className="text-lg font-semibold mb-4">
                  Otros servicios {sector.preposition.toLowerCase()}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {otherServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/servicios/${s.slug}/${sector.slug}`}
                      className="text-sm bg-stone-100 hover:bg-stone-200 rounded-full px-3 py-1.5 transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div className="text-center border-t border-stone-200 pt-12">
                <h2 className="text-2xl font-semibold">
                  ¿Necesitas {service.shortName.toLowerCase()}{" "}
                  {sector.preposition.toLowerCase()}?
                </h2>
                <p className="mt-3 text-stone-600">
                  Entendemos tu sector. Cuéntanos tu proyecto y te preparamos
                  una propuesta a medida.
                </p>
                <Link
                  href="https://calendar.app.google/12L5HW9PUfJbCfrL8"
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-6 rounded-md bg-stone-900 px-6 py-3 text-sm text-white hover:bg-stone-700 transition-colors"
                >
                  <span className="h-2 w-2 bg-emerald-400 rounded-full" />
                  Agendar reunión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
