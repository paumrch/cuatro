import Layout from "./layout";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import FeaturedProjects from "@/components/featuredProjects";
import Services from "@/components/services";
import About from "@/components/about";
import Blog from "@/components/blog";

import { getHomePageData } from "../lib/api";

import { decodeHTMLEntities } from "../utils/decodeHTMLEntities"; 

export async function generateMetadata() {
  const homePageData = await getHomePageData();
  const metadata = homePageData.pages.edges[0].node.seo;

  const decodedTitle = decodeHTMLEntities(metadata.openGraph.title);
  const decodedDescription = decodeHTMLEntities(metadata.openGraph.description);

  return {
    title: decodedTitle,
    description: metadata.description,
    canonical: metadata.canonicalUrl,
    openGraph: {
      title: decodedTitle,
      description: decodedDescription,
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
      <Blog />
      <Footer />
    </Layout>
  );
}
