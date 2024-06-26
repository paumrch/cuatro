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
                <h2 className="text-3xl">Services</h2>
              </div>
              <div id="Element" className="w-full sm:w-1/2 text-lg md:text-xl">
                <p className="text-stone-600">
                  Acompañamos tu proyecto desde su nacimiento y te ayudamos a desarrollarlo en la dirección adecueada.
                </p>
                <h3 className="relative isolate border-t border-stone-900/10 mt-4 pt-4 text-xl">
                  Branding
                </h3>
                <h3 className="relative isolate border-t border-stone-900/10 mt-4 pt-4 text-xl">
                  Diseño y desarrollo web
                </h3>
                <h3 className="relative isolate border-t border-stone-900/10 mt-4 py-4 text-xl">
                  Social Media & Paid
                </h3>
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
