import Layout from "./layout";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import FeaturedProjects from "@/components/featuredProjects";
import Services from "@/components/services";
import About from "@/components/about";
import Blog from "@/components/blog";

import { getHomePageData } from "../lib/api";

export async function generateMetadata() {
  const homePageData = await getHomePageData();
  const metadata = homePageData.pages.edges[0].node.seo;

  return {
    title: metadata.title || "4 de Junio",
    description: metadata.description,
    canonical: metadata.canonicalUrl,
    openGraph: {
      title: metadata.openGraph?.title,
      description: metadata.openGraph?.description,
      images: [{ url: metadata.openGraph?.image?.secureUrl }],
      url: metadata.openGraph?.url,
      site_name: metadata.openGraph?.siteName,
    },
    twitter: {
      card: metadata.openGraph?.twitterMeta?.card,
      title: metadata.openGraph?.twitterMeta?.title,
      description: metadata.openGraph?.twitterMeta?.description,
      site: metadata.openGraph?.twitterMeta?.site,
    },
  };
}

export default function Index() {
  return (
    <Layout>
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <Services />
      <About />
      {/* <Blog /> */}
      <Footer />
    </Layout>
  );
}