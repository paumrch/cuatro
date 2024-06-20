import Layout from "@/app/layout";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getProjectAndMoreProjects, getAllProjectsWithSlug } from "@/lib/api";
import { format } from "date-fns";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getProjectAndMoreProjects(slug);

  if (!data) {
    return {
      title: "Project Not Found",
      description: "The project you are looking for does not exist.",
    };
  }

  const { seo } = data.project;

  return {
    title: seo.title,
  };
}

export default async function Project({ params }) {
  const { slug } = params;
  const data = await getProjectAndMoreProjects(slug);

  const { project } = data;
  const formattedDate = format(new Date(project.date), "dd.MM.yyyy");

  return (
    <Layout>
      <Navbar />
      <div className="mx-auto px-6 pb-8 lg:px-8">
        <div
          id="featuredImage"
          className="mx-auto flow-root object-contain relative"
        >
          {project.projectsContent?.projectPicture.node?.sourceUrl && (
            <div className="relative aspect-square md:aspect-video">
              <Image
                src={project.projectsContent?.projectPicture.node?.sourceUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}
        </div>
        <div id="projectContent" className="mx-auto text-left">
          <div id="projectTitle" className="mt-6">
            <h1 className="text-lg font-medium">
              {project.projectsContent.projectTitle}
            </h1>
          </div>
          <div id="projectClaim">
            <h2 className="text-3xl md:text-5xl font-medium">
              Paella Auténtica es una pasada. Me flipa.
            </h2>
          </div>
          <div id="projectInfo" className="my-24 md:mx-48 lg:mx-64 xl:mx-96">
            <p className="text-lg my-12">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <h2 className="text-2xl md:text-4xl font-medium my-12">
              Hola Pau, esto es una prueba.
            </h2>
          </div>
          <div id="twoPictures" className="flex flex-col gap-4 md:flex-row">
            <div id="firstPicture" className="aspect-auto object-cover">
              <Image
                src={project.projectsContent?.projectPicture.node?.sourceUrl}
                alt={project.title}
                width={1080}
                height={1080}
                className="rounded-lg"
              />
            </div>

            <div id="secondPicture" className="h-64 object-cover">
              <Image
                src={project.projectsContent?.projectPicture.node?.sourceUrl}
                alt={project.title}
                width={1080}
                height={1080}
                className="rounded-lg"
              />
            </div>
          </div>
          <div id="projectInfo" className="my-24 md:mx-48 lg:mx-64 xl:mx-96">
            <p className="text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div id="projectClaim">
            <h2 className="text-center text-3xl md:text-5xl font-medium">
              Paella Auténtica es una pasada. Me flipa.
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export async function generateStaticParams() {
  const allProjects = await getAllProjectsWithSlug();
  return allProjects.edges.map(({ node }) => ({
    params: {
      slug: node.slug,
    },
  }));
}
