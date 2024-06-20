import Image from "next/image";
import Link from "next/link";
import { getProjectsData } from "../lib/api";

export default async function Projects({ preview }) {
  const projectsData = await getProjectsData(preview);

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
              <h2 className="mt-4 text-3xl">Work</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-24">
              {projectsData.projects.edges.map(({ node: project }) => {
                return (
                  <div className="w-full" key={project.slug}>
                    <Link href={`/work/${project.slug}`}>
                      <div className="aspect-video bg-stone-900 rounded-lg overflow-hidden">
                        <Image
                          src={
                            project.projectsContent.projectPicture.node
                              .sourceUrl
                          }
                          alt={project.projectsContent.projectTitle}
                          width={1920}
                          height={1080}
                          className="rounded-lg"
                        />
                      </div>
                    </Link>
                    <div className="flex justify-between mt-6 text-2xl">
                      <Link href={`/work/${project.slug}`}>
                        <h3 className="">
                          {project.projectsContent.projectTitle}
                        </h3>
                      </Link>
                      <p className="text-stone-600 text-lg">
                        {project.projectsContent.projectCategory}
                      </p>
                    </div>
                  </div>
                );
              })}
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
