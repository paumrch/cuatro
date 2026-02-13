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
  const projectYear = new Date(project.date).getFullYear();

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
        {/* Hero image — full bleed */}
        {project.projectsContent?.projectPicture.node?.sourceUrl && (
          <div className="relative aspect-[3/4] sm:aspect-[16/10] mt-14">
            <Image
              src={project.projectsContent.projectPicture.node.sourceUrl}
              alt={`Imagen principal del proyecto ${project.projectsContent?.projectTitle || project.title}`}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              priority
            />
          </div>
        )}

        {/* Title block */}
        <div className="mt-10 mb-16 lg:flex lg:items-start lg:justify-between lg:gap-16">
          <div className="lg:flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-balance">
              {project.projectsContent.projectTitle}
            </h1>
            {project.projectsContent.titularprincipal && (
              <p className="mt-4 text-lg lg:text-xl text-stone-400 text-balance">
                {project.projectsContent.titularprincipal}
              </p>
            )}
          </div>
          <div className="mt-6 lg:mt-1 flex gap-6 lg:flex-col lg:items-end lg:gap-1 text-sm text-stone-400">
            <span className="uppercase tracking-wide">
              {project.projectsContent?.projectCategory}
            </span>
            <span>{projectYear}</span>
          </div>
        </div>

        {/* El reto */}
        <div className="mb-16">
          <h2 className="text-sm uppercase tracking-wide text-stone-400 mb-4">El reto</h2>
          <p className="text-lg lg:text-xl text-stone-600 leading-relaxed">
            {project.projectsContent.parrafo1}
          </p>
          {project.projectsContent.subtitular1 && (
            <p className="mt-8 text-lg lg:text-xl text-stone-400 text-balance leading-relaxed">
              {project.projectsContent.subtitular1}
            </p>
          )}
        </div>

        {/* Detail images — full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {project.projectsContent?.projectPicture1?.node?.sourceUrl && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={project.projectsContent.projectPicture1.node.sourceUrl}
                alt={`Detalle del proyecto ${project.projectsContent?.projectTitle || project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg object-cover"
              />
            </div>
          )}
          {project.projectsContent?.projectPicture2?.node?.sourceUrl && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={project.projectsContent.projectPicture2.node.sourceUrl}
                alt={`Detalle adicional del proyecto ${project.projectsContent?.projectTitle || project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg object-cover"
              />
            </div>
          )}
        </div>

        {/* La solución */}
        <div className="mb-16">
          <h2 className="text-sm uppercase tracking-wide text-stone-400 mb-4">La solución</h2>
          <p className="text-lg lg:text-xl text-stone-600 leading-relaxed">
            {project.projectsContent.parrafo2}
          </p>
          {project.projectsContent.subtitular2 && (
            <p className="mt-8 text-lg lg:text-xl text-stone-400 text-balance leading-relaxed">
              {project.projectsContent.subtitular2}
            </p>
          )}
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
