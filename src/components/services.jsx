import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { getHomePageData } from "../lib/api";

const services = [
  {
    name: "Branding",
    description: "Identidad visual, naming y tono de voz. Todo lo que necesitas para que tu marca cuente lo que realmente es.",
    href: "/servicios/branding",
  },
  {
    name: "Diseño y desarrollo web",
    description: "Webs a medida que funcionan, cargan rápido y convierten visitas en clientes.",
    href: "/servicios/diseno-web",
  },
  {
    name: "Implementación de IA",
    description: "Inteligencia artificial aplicada a tu negocio. Automatiza procesos, mejora decisiones y escala operaciones.",
    href: "/servicios/implementacion-ia",
  },
  {
    name: "Automatizaciones",
    description: "Workflows inteligentes que eliminan tareas repetitivas y conectan tus herramientas.",
    href: "/servicios/automatizaciones",
  },
  {
    name: "Paid Media",
    description: "Campañas en Google Ads, Meta Ads, LinkedIn y TikTok que generan retorno real.",
    href: "/servicios/paid-media",
  },
  {
    name: "Posicionamiento SEO",
    description: "Estrategia SEO para que te encuentren en Google. Tráfico orgánico que crece cada mes.",
    href: "/servicios/posicionamiento-seo",
  },
];

export default async function Services({ preview }) {
  const homeData = await getHomePageData(preview);
  return (
    <div className="mx-auto px-6 pb-8 lg:px-8">
      <div className="relative isolate border-t border-stone-900/10">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="py-8 sm:py-12 lg:pb-12">
          <div className="mx-auto">
            <div className="mt-8 mb-10">
              <h2 className="text-3xl">Servicios</h2>
              <p className="mt-3 text-lg text-stone-500 max-w-xl">
                Acompañamos tu proyecto desde su nacimiento y te ayudamos a crecer en la dirección adecuada.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group relative flex flex-col justify-between rounded-lg border border-stone-200 p-6 cursor-pointer hover:border-stone-400 hover:shadow-sm transition-all duration-200"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-medium">{service.name}</h3>
                      <ArrowUpRightIcon className="w-4 h-4 mt-1 text-stone-300 group-hover:text-stone-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true" />
                    </div>
                    <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
}
