import Image from "next/image";

import { getProjectsData } from "../lib/api";

export default async function Hero({ preview }) {
  const projectseData = await getProjectsData(preview);
  const project1Title =
    projectseData.projects.edges[0].node.projectsContent.projectTitle;
  const project1Category =
    projectseData.projects.edges[0].node.projectsContent.projectCategory;
  const project1Image =
    projectseData.projects.edges[0].node.projectsContent.projectPicture.node
      .sourceUrl;

  return (
    <div className="mx-auto px-6 pb-8 lg:px-8">
      <div className="relative isolate border-t border-stone-900/10">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="py-8 sm:py-12 lg:pb-12">
          <div className="mx-auto">
            <div className="mx-auto text-left">
              <h2 className="mt-4 text-3xl">Proyectos</h2>
            </div>
            <div className="flex flex-col sm:flex-row mt-8 gap-6 sm:mt-24">
              <div id="Element" className="w-full">
                <Image
                  src={project1Image}
                  alt="App screenshot"
                  width={1080}
                  height={1080}
                  className="rounded-lg"
                />
                <div
                  id="infoElement"
                  className="flex justify-between mt-6 text-2xl"
                >
                  <h3 id="title" className="">
                    {project1Title}
                  </h3>
                  <p id="category" className="mr-12 text-stone-600">
                    {project1Category}
                  </p>
                </div>
              </div>
              <div id="Element" className="w-full">
                <Image
                  src={project1Image}
                  alt="App screenshot"
                  width={1080}
                  height={1080}
                  className="rounded-lg"
                />
                <div
                  id="infoElement"
                  className="flex justify-between mt-6 text-2xl"
                >
                  <h3 id="title" className="">
                    Hola
                  </h3>
                  <p id="category" className="mr-12 text-stone-600">
                    Brand
                  </p>
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
