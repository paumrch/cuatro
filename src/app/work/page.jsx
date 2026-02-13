import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { getProjectsData } from "@/lib/api";
import JsonLd, { getBreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Proyectos",
  description:
    "Explora los proyectos de branding, diseño web y estrategia digital de 4 de Junio. Trabajos reales para marcas reales.",
  alternates: {
    canonical: "https://4dejunio.com/work",
  },
  openGraph: {
    title: "Proyectos | 4 de Junio",
    description:
      "Proyectos de branding, diseño web y estrategia digital para marcas en Valencia y toda España.",
    url: "https://4dejunio.com/work",
    type: "website",
  },
};

export default async function WorkIndex() {
  const projectsData = await getProjectsData();

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Inicio", url: "https://4dejunio.com" },
          { name: "Proyectos", url: "https://4dejunio.com/work" },
        ])}
      />
      <Navbar />
      <div className="mx-auto px-6 pb-8 lg:px-8">
        <div className="py-8 sm:py-12 lg:pb-12">
          <div className="mx-auto">
            <h1 className="text-4xl md:text-5xl font-medium text-balance">Proyectos</h1>
            <p className="mt-4 text-lg text-stone-600 max-w-2xl">
              Una selección de trabajos de branding, diseño web y estrategia
              digital para marcas que buscan crecer con propósito.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-16">
              {projectsData.projects.edges.map(({ node: project }) => (
                <div className="w-full" key={project.slug}>
                  <Link href={`/work/${project.slug}`}>
                    <div className="aspect-video bg-stone-900 rounded-lg overflow-hidden">
                      <Image
                        src={
                          project.projectsContent.projectPicture.node.sourceUrl
                        }
                        alt={`Proyecto ${project.projectsContent.projectTitle} — ${project.projectsContent.projectCategory}`}
                        width={1920}
                        height={1080}
                        className="rounded-lg hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <div className="flex justify-between mt-6 text-2xl">
                    <Link href={`/work/${project.slug}`}>
                      <h2>{project.projectsContent.projectTitle}</h2>
                    </Link>
                    <p className="text-stone-600 text-lg">
                      {project.projectsContent.projectCategory}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
