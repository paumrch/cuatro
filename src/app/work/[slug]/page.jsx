import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getProjectAndMoreProjects, getAllProjectsWithSlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import JsonLd, { getCreativeWorkJsonLd, getBreadcrumbJsonLd } from "@/components/JsonLd";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getProjectAndMoreProjects(slug);

  if (!data?.project) {
    return {
      title: "Proyecto no encontrado",
      description: "El proyecto que buscas no existe.",
    };
  }

  const { seo } = data.project;
  const { project } = data;

  return {
    title: seo.title,
    description: seo.description || `Proyecto ${project.projectsContent?.projectTitle} — Branding, diseño y desarrollo por 4 de Junio.`,
    alternates: {
      canonical: `https://4dejunio.com/work/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description || `Descubre el proyecto ${project.projectsContent?.projectTitle} desarrollado por 4 de Junio.`,
      images: project.projectsContent?.projectPicture?.node?.sourceUrl
        ? [{ url: project.projectsContent.projectPicture.node.sourceUrl }]
        : [],
      url: `https://4dejunio.com/work/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description || `Proyecto ${project.projectsContent?.projectTitle} por 4 de Junio.`,
    },
  };
}

export default async function Project({ params }) {
  const { slug } = params;
  const data = await getProjectAndMoreProjects(slug);

  if (!data?.project) {
    notFound();
  }

  const { project } = data;

  return (
    <>
      <JsonLd
        data={getCreativeWorkJsonLd({
          title: project.projectsContent?.projectTitle || project.title,
          description: project.projectsContent?.parrafo1 || `Proyecto de ${project.projectsContent?.projectCategory} por 4 de Junio`,
          slug: slug,
          image: project.projectsContent?.projectPicture?.node?.sourceUrl,
          category: project.projectsContent?.projectCategory,
        })}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Inicio", url: "https://4dejunio.com" },
          { name: "Proyectos", url: "https://4dejunio.com/work" },
          { name: project.projectsContent?.projectTitle || project.title, url: `https://4dejunio.com/work/${slug}` },
        ])}
      />
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
                alt={`Imagen principal del proyecto ${project.projectsContent?.projectTitle || project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                priority
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
            <h2 className="my-4 text-3xl md:text-5xl font-medium">
              {project.projectsContent.titularprincipal}
            </h2>
          </div>
          <div id="projectInfo" className="my-12 md:mx-48 lg:mx-64 xl:mx-96">
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
                alt={`Detalle del proyecto ${project.projectsContent?.projectTitle || project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg object-cover"
              />
            </div>
            <div id="secondPicture" className="relative w-full h-96">
              <Image
                src={project.projectsContent?.projectPicture2?.node?.sourceUrl}
                alt={`Detalle adicional del proyecto ${project.projectsContent?.projectTitle || project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          <div id="projectInfo" className="my-12 md:mx-48 lg:mx-64 xl:mx-96">
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
    </>
  );
}

export async function generateStaticParams() {
  const allProjects = await getAllProjectsWithSlug();
  return allProjects.edges.map(({ node }) => ({
    slug: node.slug,
  }));
}
