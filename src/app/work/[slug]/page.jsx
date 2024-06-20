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
        <div id="projectContent" className="mx-auto">
          <div id="projectTitle" className="mt-6">
            <h1 className="text-lg font-medium">
              {project.projectsContent.projectTitle}
            </h1>
          </div>
          <div id="projectClaim">
            <h2 className="text-3xl md:text-5xl font-medium">
              {project.projectsContent.titularprincipal}
            </h2>
          </div>
          <div id="projectInfo" className="my-24 md:mx-48 lg:mx-64 xl:mx-96">
            <p className="text-lg my-12">{project.projectsContent.parrafo1}</p>
            <h2 className="text-2xl md:text-4xl font-medium my-12">
              {project.projectsContent.subtitular1}
            </h2>
          </div>
          <div
            id="twoPictures"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div id="firstPicture" className="relative w-full h-96">
              <Image
                src={project.projectsContent?.projectPicture1?.node?.sourceUrl}
                alt={project.title}
                layout="fill"
                className="rounded-lg object-cover"
              />
            </div>
            <div id="secondPicture" className="relative w-full h-96">
              <Image
                src={project.projectsContent?.projectPicture2?.node?.sourceUrl}
                alt={project.title}
                layout="fill"
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          <div id="projectInfo" className="my-24 md:mx-48 lg:mx-64 xl:mx-96">
            <p className="text-lg">{project.projectsContent.parrafo2}</p>
          </div>
          <div id="projectClaim">
            <h2 className="text-center text-2xl md:text-3xl font-medium">
              {project.projectsContent.subtitular2}
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
