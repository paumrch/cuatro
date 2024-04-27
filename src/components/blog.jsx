import Image from "next/image";

export default function Blog() {
  return (
    <div className="mx-auto px-6 pb-8 lg:px-8">
      <div className="relative isolate border-t border-stone-900/10">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="py-8 sm:py-12 lg:pb-12">
          <div className="mx-auto">
            <div className="text-left w-full sm:w-1/2 mt-8">
              <h2 className="text-3xl">Blog</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-4 my-8">
              <div id="post" className="flex flex-row md:flex-col gap-6 w-full">
                <div className="w-1/3 md:w-full">
                  <Image
                    src="https://picsum.photos/200"
                    alt="App screenshot"
                    width={100}
                    height={100}
                    className="w-full rounded-lg"
                  />
                </div>
                <div id="postInfo" className="w-2/3 md:w-full">
                  <span>Category</span>
                  <h4 id="title" className="text-xl font-semibold">
                    Hola este es el título del post
                  </h4>
                  <span>Date</span>
                </div>
              </div>
              <div id="post" className="flex flex-row md:flex-col gap-6 w-full">
                <div className="w-1/3 md:w-full">
                  <Image
                    src="https://picsum.photos/200"
                    alt="App screenshot"
                    width={125}
                    height={125}
                    className="w-full rounded-lg"
                  />
                </div>
                <div id="postInfo" className="w-2/3 md:w-full">
                  <span>Category</span>
                  <h4 id="title" className="text-xl font-semibold">
                    Hola este es el título del post
                  </h4>
                  <span>Date</span>
                </div>
              </div>
              <div id="post" className="flex flex-row md:flex-col gap-6 w-full">
                <div className="w-1/3 md:w-full">
                  <Image
                    src="https://picsum.photos/200"
                    alt="App screenshot"
                    width={125}
                    height={125}
                    className="w-full rounded-lg"
                  />
                </div>
                <div id="postInfo" className="w-2/3 md:w-full">
                  <span>Category</span>
                  <h4 id="title" className="text-xl font-semibold">
                    Hola este es el título del post
                  </h4>
                  <span>Date</span>
                </div>
              </div>
              <div id="post" className="flex flex-row md:flex-col gap-6 w-full">
                <div className="w-1/3 md:w-full">
                  <Image
                    src="https://picsum.photos/200"
                    alt="App screenshot"
                    width={125}
                    height={125}
                    className="w-full rounded-lg"
                  />
                </div>
                <div id="postInfo" className="w-2/3 md:w-full">
                  <span>Category</span>
                  <h4 id="title" className="text-xl font-semibold">
                    Hola este es el título del post
                  </h4>
                  <span>Date</span>
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
