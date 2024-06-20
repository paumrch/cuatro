import Layout from "@/app/layout";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getProjectAndMoreProjects, getAllProjectsWithSlug } from "@/lib/api";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getProjectAndMoreProjects(slug);

  if (!data) {
    return {
      title: "Project Not Found",
      description: "The project you are looking for does not exist.",
    };
  }

  const { seo } = data;

  return {
    title: data.title,
    description: data.description,
    canonical: data.canonicalUrl,
  };
}

export default async function Project({ params }) {
  const { slug } = params;
  const data = await getProjectAndMoreProjects(slug);

  const { project } = data;


  console.log(project)


  return (
    <Layout>
      <Navbar />
      <h1 className="text-3xl font-semibold">{project.title}</h1>
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
