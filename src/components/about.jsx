import Image from "next/image";
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
                <h2 className="text-3xl">About</h2>
              </div>
              <div
                id="IdentidadContent"
                className="w-full sm:w-1/2 text-stone-600 text-lg md:text-xl"
              >
                <p>
                  Mentes abiertas, creativas y tecnológicas para desarrollar
                  proyectos digitales de primer nivel y narrativas de marca
                  únicas para los clientes más especiales.
                </p>
                <p className="text-lg mt-4 hover:underline">
                  <a
                    href="https://linkedin.com/company/4dejunio/"
                    className="flex items-center group"
                    target="_blank"
                  >
                    <ArrowRightIcon className="mr-2 w-4 h-5 text-current" />
                    Conócenos en LinkedIn
                    <span className="relative overflow-hidden">
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                    </span>
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-12 sm:mt-24">
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/KomeBlack.svg"
                      alt="KOME"
                      width={120}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/Techne-Black.svg"
                      alt="Techné 183"
                      width={120}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/G2-Care-Black.svg"
                      alt="G2 Care"
                      width={120}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/DraIsabelCamps-Black.svg"
                      alt="Dra. Isabel Camps"
                      width={150}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/MaverickBlack.svg"
                      alt="MAVERICK"
                      width={100}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-200 p-8 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/LuzzioBlack.svg"
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
