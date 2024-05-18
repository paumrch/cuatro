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
                <h2 className="text-3xl">¿Por qué?</h2>
              </div>
              <div id="Element" className="w-full sm:w-1/2">
                <p>
                  Our expertise lies at the intersection of design and
                  technology, providing you with integrated thinking without
                  sacrificing one for the other.
                </p>
              </div>
            </div>

            <div className="mt-12 sm:mt-24">
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
                <li>
                  <div className="bg-stone-900 p-12 rounded-lg">
                    <Image
                      src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                      alt="App screenshot"
                      width={125}
                      height={125}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-900 p-12 rounded-lg">
                    <Image
                      src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                      alt="App screenshot"
                      width={125}
                      height={125}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-900 p-12 rounded-lg">
                    <Image
                      src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                      alt="App screenshot"
                      width={125}
                      height={125}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-900 p-12 rounded-lg">
                    <Image
                      src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                      alt="App screenshot"
                      width={125}
                      height={125}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-900 p-12 rounded-lg">
                    <Image
                      src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                      alt="App screenshot"
                      width={125}
                      height={125}
                    />
                  </div>
                </li>
                <li>
                  <div className="bg-stone-900 p-12 rounded-lg">
                    <Image
                      src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                      alt="App screenshot"
                      width={125}
                      height={125}
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
