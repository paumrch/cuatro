import Image from "next/image";
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
            <div className="flex flex-col sm:flex-row mt-8 gap-6">
              <div className="text-left w-full sm:w-1/2">
                <h2 className="text-3xl">Nosotros</h2>
              </div>
              <div
                id="IdentidadContent"
                className="w-full sm:w-1/2 text-stone-600 text-lg md:text-xl"
              >
                <p>
                  Mentes creativas y tecnológicas trabajando juntas para
                  desarrollar proyectos digitales de primer nivel y narrativas
                  de marca que conectan con las personas adecuadas.
                </p>
                <p className="text-lg mt-4 hover:underline">
                  <Link
                    href="https://linkedin.com/company/4dejunio/"
                    className="flex items-center group"
                    target="_blank"
                  >
                    <ArrowRightIcon className="mr-2 w-4 h-5 text-current" aria-hidden="true" />
                    Echa un vistazo en LinkedIn
                    <span className="relative overflow-hidden">
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                    </span>
                  </Link>
                </p>
                <div id="team" className="my-8">
                  <h3 className="text-2xl my-6">Equipo</h3>
                  <div className="flex flex-col gap-4 max-w-lg">
                    <div id="Pau" className="leading-6">
                      <h4 className="text-lg">Pau March</h4>
                      <span className="text-sm text-stone-500">
                        Founder & Creative Director
                      </span>
                      <p className="mt-4 leading-6 text-base">
                        Creativo con más de 5 años de experiencia en desarrollo
                        web y estrategia digital para marcas. Visión y diseño de
                        soluciones presentes en empresas e instituciones, en
                        España y Europa.
                        <br />
                        <br />
                        La mirada estratégica de la agencia. Cada proyecto es una
                        oportunidad de crear algo que funcione tan bien como se
                        ve.
                      </p>
                      <p className="text-base mt-4 hover:underline text-stone-500">
                        <Link
                          href="https://www.linkedin.com/in/paumrch/"
                          className="flex items-center group"
                          target="_blank"
                        >
                          <ArrowRightIcon className="mr-2 w-4 h-5 text-current" aria-hidden="true" />
                          LinkedIn
                          <span className="relative overflow-hidden">
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                          </span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 sm:mt-24">
              <h3 className="text-xl text-stone-600 mb-6">Marcas que confían en nosotros</h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="https://wp.4dejunio.com/wp-content/uploads/2024/05/KomeBlack.svg"
                      alt="KOME"
                      width={120}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="https://wp.4dejunio.com/wp-content/uploads/2024/05/Techne-Black.svg"
                      alt="Techné 183"
                      width={120}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="https://wp.4dejunio.com/wp-content/uploads/2024/05/G2-Care-Black.svg"
                      alt="G2 Care"
                      width={120}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="https://wp.4dejunio.com/wp-content/uploads/2024/05/DraIsabelCamps-Black.svg"
                      alt="Dra. Isabel Camps"
                      width={150}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="https://wp.4dejunio.com/wp-content/uploads/2024/05/MaverickBlack.svg"
                      alt="MAVERICK"
                      width={100}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="https://wp.4dejunio.com/wp-content/uploads/2024/05/LuzzioBlack.svg"
                      alt="Luzzio"
                      width={100}
                      height={90}
                    />
                  </div>
                </li>
              </ul>
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
