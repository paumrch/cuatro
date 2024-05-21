import { getAllPostsWithSlug } from "../lib/api";

export default async function sitemap() {
  const SITE_URL = "https://4dejunio.com";

  try {
    const allPosts = await getAllPostsWithSlug();
    const posts = allPosts.edges.map(({ node }) => {
      const { slug, seo } = node;
      if (!slug || !seo) return null;

      return {
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      };
    }).filter(post => post !== null);

    // Agregar la URL de la página principal
    const homePageUrl = {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    };

    const urls = [homePageUrl, ...posts];

    return urls;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
