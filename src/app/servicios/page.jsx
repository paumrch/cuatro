import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import JsonLd, { getBreadcrumbJsonLd } from "@/components/JsonLd";
import { services } from "@/lib/pseo-data";

export const metadata = {
  title: "Servicios de Agencia Creativa y Digital",
  description:
    "Branding, diseño web, implementación de IA, automatizaciones, paid media y posicionamiento SEO. Servicios de agencia creativa para empresas en toda España.",
  alternates: {
    canonical: "https://4dejunio.com/servicios",
  },
  openGraph: {
    title: "Servicios | 4 de Junio",
    description:
      "Branding, diseño web, IA, automatizaciones, paid media y SEO. Todo lo que tu empresa necesita para crecer en digital.",
    url: "https://4dejunio.com/servicios",
  },
};

export default function ServiciosIndex() {
  const serviceList = Object.values(services);

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Inicio", url: "https://4dejunio.com" },
          { name: "Servicios", url: "https://4dejunio.com/servicios" },
        ])}
      />
      <Navbar />

      <div className="mx-auto px-6 pb-8 lg:px-8">
        <div className="relative isolate pt-14">
          <div className="py-12 sm:py-18 lg:pb-20">
            <div className="mx-auto max-w-screen-lg">
              {/* Hero */}
              <div className="text-left mb-16">
                <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-balance">
                  Lo que hacemos
                </h1>
                <p className="mt-6 text-lg text-stone-600 max-w-2xl">
                  Acompañamos a empresas en toda España con servicios de branding,
                  diseño web, inteligencia artificial, automatizaciones,
                  publicidad digital y posicionamiento SEO. Todo lo que necesitas
                  para crecer en digital, bajo un mismo techo.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {serviceList.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className="group border border-stone-200 rounded-lg p-8 hover:border-stone-400 transition-colors duration-300"
                  >
                    <span className="text-2xl">{service.icon}</span>
                    <h2 className="text-xl font-medium mt-3 group-hover:underline">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-stone-600 text-sm leading-relaxed">
                      {service.metaDescription}
                    </p>
                    <span className="inline-block mt-4 text-sm text-stone-500 group-hover:text-stone-900 transition-colors">
                      Ver servicio →
                    </span>
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-20 text-center border-t border-stone-200 pt-16">
                <h2 className="text-2xl font-medium">
                  ¿No sabes por dónde empezar?
                </h2>
                <p className="mt-3 text-stone-600 max-w-lg mx-auto">
                  Cuéntanos tu situación y te recomendamos los servicios que
                  mayor impacto pueden tener en tu negocio.
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
