import AnimatedVideo from "./animated/AnimatedVideo";
import Link from "next/link";
import { getHomePageData } from "../lib/api";

export default async function Hero({ preview }) {
  const homeData = await getHomePageData(preview);
  const homeHeading = homeData.pages.nodes[0].home.heading;
  const homeSubheading = homeData.pages.nodes[0].home.subheading;

  return (
    <div className="mx-auto px-6 pb-8 lg:px-8">
      <div className="relative isolate pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="py-16 sm:py-24 lg:pb-32">
          <div className="mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
              {/* Video — left on desktop, below on mobile */}
              <div className="order-2 lg:order-1 lg:w-1/2 mt-12 lg:mt-0">
                <div className="rounded-lg overflow-hidden">
                  <AnimatedVideo />
                </div>
              </div>
              {/* Content — right on desktop, above on mobile */}
              <div className="order-1 lg:order-2 lg:w-1/2">
                <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-normal tracking-tight text-balance">
                  {homeHeading}
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-stone-500">
                  {homeSubheading}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="mailto:pau@4dejunio.com"
                    className="inline-flex items-center rounded-md border border-stone-300 bg-transparent px-6 py-2.5 text-sm font-medium text-stone-900 hover:border-stone-900 hover:text-stone-900 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2"
                  >
                    <span className="h-2 w-2 bg-emerald-500 rounded-full mr-2"></span>
                    Agendar reunión
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center rounded-md bg-stone-100 px-6 py-2.5 text-sm font-medium text-stone-900 shadow-sm hover:bg-stone-200 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2"
                  >
                    Ver proyectos
                  </Link>
                </div>
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
