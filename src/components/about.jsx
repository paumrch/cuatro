import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function About() {
  return (
    <div className="mx-auto px-6 pb-8 lg:px-8">
      <div className="relative isolate border-t border-stone-900/10">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="py-8 sm:py-12 lg:pb-12">
          <div className="mx-auto">
            <h2 className="text-3xl mt-8">Nosotros</h2>
            <div className="mt-6 text-stone-600 text-lg md:text-xl space-y-4">
              <p>
                Mentes creativas y tecnológicas trabajando juntas para
                desarrollar proyectos digitales de primer nivel y narrativas
                de marca que conectan con las personas adecuadas.
              </p>
              <p>
                Fundada por{" "}
                <Link
                  href="https://www.linkedin.com/in/paumrch/"
                  target="_blank"
                  className="underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors duration-300"
                >
                  Pau March
                </Link>
                , con más de 5 años de experiencia en desarrollo web y
                estrategia digital para marcas en España y Europa.
              </p>
            </div>
            <p className="text-lg mt-6">
              <Link
                href="https://linkedin.com/company/4dejunio/"
                className="flex items-center group"
                target="_blank"
              >
                <ArrowRightIcon className="mr-2 w-4 h-5 text-current" aria-hidden="true" />
                Echa un vistazo en LinkedIn
              </Link>
            </p>
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
