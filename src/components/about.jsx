import Image from "next/image";

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
                <h2 className="text-3xl">Identidad</h2>
              </div>
              <div id="Element" className="w-full sm:w-1/2">
                <p>
                  Mentes abiertas, creativas y tecnológicas para desarrollar
                  proyectos digitales de primer nivel.
                </p>
              </div>
            </div>

            <div className="mt-12 sm:mt-24">
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                <li>
                  <div className="bg-stone-800 p-12 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/KOME.svg"
                      alt="KOME"
                      width={90}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-800 p-12 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/Techne183.svg"
                      alt="Techné 183"
                      width={90}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-800 p-12 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/G2-Care.svg"
                      alt="G2 Care"
                      width={90}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-800 p-12 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/DraIsabelCamps.svg"
                      alt="Dra. Isabel Camps"
                      width={90}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-800 p-12 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/MAVERICK.svg"
                      alt="MAVERICK"
                      width={90}
                      height={90}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-800 p-12 rounded-lg flex items-center h-32 justify-center">
                    <Image
                      src="http://wp.4dejunio.com/wp-content/uploads/2024/05/Luzzio.svg"
                      alt="Luzzio"
                      width={90}
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
