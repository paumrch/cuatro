// pages/posts/[slug].jsx

import Layout from "@/app/layout";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getAllPostsWithSlug, getPostAndMorePosts } from "@/lib/api";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Post({ params }) {
  const { slug } = params;
  const data = await getPostAndMorePosts(slug);

  if (!data.post) {
    notFound();
  }

  const { post, morePosts } = data;
  const formattedDate = format(new Date(post.date), "dd.MM.yyyy");

  return (
    <Layout>
      <Navbar />
      <div className="post-content mx-auto px-6 pb-8 lg:px-8">
        <div className="relative isolate pt-14">
          <div className="py-12 sm:py-18 lg:pb-40">
            <div className="mx-auto max-w-screen-md px-4">
              <div className="text-left">
                <h1 className="text-3xl font-semibold">{post.title}</h1>
                <div className="flex gap-4 mt-4">
                  <span className="bg-stone-100 rounded-full px-2 py-1 text-xs uppercase">
                    {post.categories.edges[0]?.node.name}
                  </span>
                  <span className="bg-stone-100 rounded-full px-2 py-1 text-xs uppercase">
                    {formattedDate}
                  </span>
                </div>
                <div className="mt-8">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    width={1920}
                    height={1080}
                    className="rounded-lg aspect-video object-cover"
                  />
                </div>
                <div className="mt-8">
                  <div
                    className="prose lg:prose-xl mx-auto"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export async function generateStaticParams() {
  const allPosts = await getAllPostsWithSlug();
  return allPosts.edges.map(({ node }) => ({
    slug: node.slug,
  }));
}
