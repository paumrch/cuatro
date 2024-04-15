import Layout from "./layout";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import FeaturedProjects from "@/components/featuredProjects";
import Services from "@/components/services";
import About from "@/components/about";

import { getAllPostsFromWordPress } from "../lib/api";

export default async function Index({ preview }) {
  const allPosts = await getAllPostsFromWordPress(preview);
  const firtsPost = allPosts.edges[0].node;

  return (
    <Layout>
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <Services />
      <About />
      <Footer />
    </Layout>
  );
}
