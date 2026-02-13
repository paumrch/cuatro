import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import JsonLd, { getBreadcrumbJsonLd } from "@/components/JsonLd";
import {
  services,
  cities,
  sectors,
  getServiceSlugs,
  getServiceJsonLd,
} from "@/lib/pseo-data";

export async function generateMetadata({ params }) {
  const { service: serviceSlug } = params;
  const service = services[serviceSlug];
  if (!service) return { title: "Servicio no encontrado" };

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `https://4dejunio.com/servicios/${service.slug}`,
    },
    openGraph: {
      title: `${service.metaTitle} | 4 de Junio`,
      description: service.metaDescription,
      url: `https://4dejunio.com/servicios/${service.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ service: slug }));
}

export default function ServicePage({ params }) {
  const { service: serviceSlug } = params;
  const service = services[serviceSlug];
  if (!service) notFound();

  const cityList = Object.values(cities);
  const sectorList = Object.values(sectors);

  return (
    <>
      <JsonLd data={getServiceJsonLd(service)} />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Inicio", url: "https://4dejunio.com" },
          { name: "Servicios", url: "https://4dejunio.com/servicios" },
          {
            name: service.name,
            url: `https://4dejunio.com/servicios/${service.slug}`,
          },
        ])}
      />
      {/* FAQ Schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
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
                <span className="text-stone-900">{service.name}</span>
              </nav>

              {/* Hero */}
              <div className="mb-12">
                <span className="text-3xl">{service.icon}</span>
                <h1 className="text-3xl sm:text-4xl font-medium mt-4 tracking-tight text-balance">
                  {service.heroHeading}
                </h1>
                <p className="mt-4 text-lg text-stone-600">
                  {service.heroSubheading}
                </p>
              </div>

              {/* Intro */}
              <p className="text-base text-stone-700 leading-relaxed mb-10">
                {service.intro}
              </p>

              {/* Body Content */}
              <div
                className="prose lg:prose-lg prose-stone mx-auto mb-16"
                dangerouslySetInnerHTML={{ __html: service.body }}
              />

              {/* Benefits */}
              <section className="mb-16">
                <h2 className="text-2xl font-medium mb-6">
                  Qué vas a conseguir
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="border border-stone-200 rounded-lg p-6"
                    >
                      <h3 className="font-medium">{benefit.title}</h3>
                      <p className="mt-2 text-sm text-stone-600">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Process */}
              <section className="mb-16">
                <h2 className="text-2xl font-medium mb-6">
                  Cómo trabajamos
                </h2>
                <div className="space-y-4">
                  {service.process.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-medium">{step.step}</h3>
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
                <h2 className="text-2xl font-medium mb-6">
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

              {/* Internal Links — Cities */}
              <section className="mb-12 border-t border-stone-200 pt-10">
                <h2 className="text-lg font-medium mb-4">
                  {service.name} por ciudad
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cityList.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/servicios/${service.slug}/${city.slug}`}
                      className="text-sm bg-stone-100 hover:bg-stone-200 rounded-full px-3 py-1.5 transition-colors"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Internal Links — Sectors */}
              <section className="mb-16">
                <h2 className="text-lg font-medium mb-4">
                  {service.name} por sector
                </h2>
                <div className="flex flex-wrap gap-2">
                  {sectorList.map((sector) => (
                    <Link
                      key={sector.slug}
                      href={`/servicios/${service.slug}/${sector.slug}`}
                      className="text-sm bg-stone-100 hover:bg-stone-200 rounded-full px-3 py-1.5 transition-colors"
                    >
                      {sector.name}
                    </Link>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div className="text-center border-t border-stone-200 pt-12">
                <h2 className="text-2xl font-medium">
                  ¿Hablamos de tu proyecto?
                </h2>
                <p className="mt-3 text-stone-600">
                  Cuéntanos qué necesitas y te proponemos la mejor solución.
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
