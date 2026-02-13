import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getAllPostsWithSlug, getPostAndMorePosts } from "@/lib/api";
import Image from "next/image";

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
import { notFound } from "next/navigation";
import JsonLd, { getArticleJsonLd, getBreadcrumbJsonLd } from "@/components/JsonLd";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getPostAndMorePosts(slug);

  if (!data.post) {
    return {
      title: "Post Not Found",
      description: "The post you are looking for does not exist.",
    };
  }

  const { seo } = data.post;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `https://4dejunio.com/blog/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: [{ url: data.post.featuredImage?.node?.sourceUrl }],
      url: seo.canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function Post({ params }) {
  const { slug } = params;
  const data = await getPostAndMorePosts(slug);

  if (!data.post) {
    notFound();
  }

  const { post, morePosts } = data;
  const formattedDate = dateFormatter.format(new Date(post.date));

  return (
    <>
      <JsonLd
        data={getArticleJsonLd({
          title: post.title,
          description: post.seo?.description || post.excerpt,
          slug: post.slug,
          date: post.date,
          image: post.featuredImage?.node?.sourceUrl,
          author: post.author?.node?.name,
        })}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Inicio", url: "https://4dejunio.com" },
          { name: "Blog", url: "https://4dejunio.com/blog" },
          { name: post.title, url: `https://4dejunio.com/blog/${post.slug}` },
        ])}
      />
      <Navbar />
      <div className="mx-auto px-6 pb-8 lg:px-8">
        {/* Hero image — full width */}
        {post.featuredImage?.node?.sourceUrl && (
          <div className="mt-14">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              width={1920}
              height={1080}
              className="rounded-lg aspect-[16/10] object-cover w-full"
              priority
            />
          </div>
        )}

        {/* Title + meta — centered */}
        <div className="max-w-3xl mx-auto mt-10 mb-12">
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-balance">
            {post.title}
          </h1>
          <div className="mt-4 flex gap-4 text-sm text-stone-400">
            <span className="uppercase tracking-wide">
              {post.categories.edges[0]?.node?.name || "Blog"}
            </span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Article content — centered */}
        <div className="post-content max-w-3xl mx-auto">
          <div
            className="prose lg:prose-lg prose-stone"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const allPosts = await getAllPostsWithSlug();
  return allPosts.edges.map(({ node }) => ({
    slug: node.slug,
  }));
}
