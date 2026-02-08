import { getAllPostsWithSlug, getAllProjectsWithSlug } from "../lib/api";

export default async function sitemap() {
  const SITE_URL = "https://4dejunio.com";

  try {
    const allPosts = await getAllPostsWithSlug();
    const allProjects = await getAllProjectsWithSlug();

    const posts = allPosts.edges.map(({ node }) => {
      const { slug, seo } = node;
      if (!slug || !seo) return null;

      return {
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      };
    }).filter(post => post !== null);

    const projects = allProjects.edges.map(({ node }) => {
      const { slug, seo } = node;
      if (!slug || !seo) return null;

      return {
        url: `${SITE_URL}/work/${slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      };
    }).filter(project => project !== null);

    // Páginas estáticas
    const staticPages = [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/work`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/legal`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },
    ];

    const urls = [...staticPages, ...projects, ...posts];

    return urls;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
