import Link from "next/link";
import { getHomePageData } from "../lib/api";

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
            <div className="flex flex-col sm:flex-row mt-8 gap-6">
              <div className="text-left w-full sm:w-1/2">
                <h2 className="text-3xl">Servicios</h2>
              </div>
              <div id="Element" className="w-full sm:w-1/2 text-lg md:text-xl">
                <p className="text-stone-600">
                  Acompañamos tu proyecto desde su nacimiento y te ayudamos a crecer en la dirección adecuada.
                </p>
                <Link href="/servicios/branding" className="block">
                  <div className="relative isolate border-t border-stone-900/10 mt-4 pt-4 hover:bg-stone-50 -mx-2 px-2 rounded transition-colors">
                    <h3 className="text-xl">Branding</h3>
                    <p className="text-base text-stone-500 mt-1">
                      Identidad visual, naming y tono de voz. Todo lo que necesitas para que tu marca cuente lo que realmente es.
                    </p>
                  </div>
                </Link>
                <Link href="/servicios/diseno-web" className="block">
                  <div className="relative isolate border-t border-stone-900/10 mt-4 pt-4 hover:bg-stone-50 -mx-2 px-2 rounded transition-colors">
                    <h3 className="text-xl">Diseño y desarrollo web</h3>
                    <p className="text-base text-stone-500 mt-1">
                      Webs a medida que funcionan, cargan rápido y convierten visitas en clientes.
                    </p>
                  </div>
                </Link>
                <Link href="/servicios/implementacion-ia" className="block">
                  <div className="relative isolate border-t border-stone-900/10 mt-4 pt-4 hover:bg-stone-50 -mx-2 px-2 rounded transition-colors">
                    <h3 className="text-xl">Implementación de IA</h3>
                    <p className="text-base text-stone-500 mt-1">
                      Inteligencia artificial aplicada a tu negocio. Automatiza procesos, mejora decisiones y escala operaciones.
                    </p>
                  </div>
                </Link>
                <Link href="/servicios/automatizaciones" className="block">
                  <div className="relative isolate border-t border-stone-900/10 mt-4 pt-4 hover:bg-stone-50 -mx-2 px-2 rounded transition-colors">
                    <h3 className="text-xl">Automatizaciones</h3>
                    <p className="text-base text-stone-500 mt-1">
                      Workflows inteligentes que eliminan tareas repetitivas y conectan tus herramientas.
                    </p>
                  </div>
                </Link>
                <Link href="/servicios/paid-media" className="block">
                  <div className="relative isolate border-t border-stone-900/10 mt-4 pt-4 hover:bg-stone-50 -mx-2 px-2 rounded transition-colors">
                    <h3 className="text-xl">Paid Media</h3>
                    <p className="text-base text-stone-500 mt-1">
                      Campañas en Google Ads, Meta Ads, LinkedIn y TikTok que generan retorno real.
                    </p>
                  </div>
                </Link>
                <Link href="/servicios/posicionamiento-seo" className="block">
                  <div className="relative isolate border-t border-stone-900/10 mt-4 pt-4 pb-4 hover:bg-stone-50 -mx-2 px-2 rounded transition-colors">
                    <h3 className="text-xl">Posicionamiento SEO</h3>
                    <p className="text-base text-stone-500 mt-1">
                      Estrategia SEO para que te encuentren en Google. Tráfico orgánico que crece cada mes.
                    </p>
                  </div>
                </Link>
              </div>
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
