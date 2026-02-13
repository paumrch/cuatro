import Image from "next/image";
import { getAllPostsForHome } from "@/lib/api";
import Link from "next/link";

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default async function Blog({ preview }) {
  const postsForHome = await getAllPostsForHome(preview);

  return (
    <div className="mx-auto px-6 pb-8 lg:px-8">
      <div className="relative isolate border-t border-stone-900/10">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="py-8 sm:py-12 lg:pb-12">
          <div className="mx-auto">
            <div className="text-left w-full sm:w-1/2 mt-8">
              <h2 className="text-3xl">Blog</h2>
            </div>
            <div className="sm:hidden flex overflow-x-auto my-8 no-scrollbar">
              <div className="flex flex-nowrap space-x-6">
                {postsForHome.edges.map(({ node: post }) => {
                  const formattedDate = dateFormatter.format(new Date(post.date));
                  return (
                    <div key={post.slug} className="flex-none w-64">
                      {post.featuredImage?.node?.sourceUrl && (
                        <Link href={`/blog/${post.slug}`}>
                          <div className="aspect-square rounded-lg overflow-hidden">
                            <Image
                              src={post.featuredImage.node.sourceUrl}
                              alt={post.title}
                              width={1080}
                              height={1080}
                              className="rounded-lg object-cover w-full h-full"
                            />
                          </div>
                        </Link>
                      )}
                      <Link href={`/blog/${post.slug}`}>
                        <div>
                          <div className="flex my-4 gap-4 uppercase font-normal justify-between text-xs">
                            <span className="">{post.categories.edges[0].node.name}</span>
                            <span>{formattedDate}</span>
                          </div>
                          <p className="text-2xl font-medium">{post.title}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
              {postsForHome.edges.map(({ node: post }) => {
                const formattedDate = dateFormatter.format(new Date(post.date));
                return (
                  <div key={post.slug} className="flex flex-col gap-4">
                    {post.featuredImage?.node?.sourceUrl && (
                      <Link href={`/blog/${post.slug}`}>
                        <div className="aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            width={1080}
                            height={1080}
                            className="rounded-lg object-cover w-full h-full"
                          />
                        </div>
                      </Link>
                    )}
                    <Link href={`/blog/${post.slug}`}>
                      <div className="">
                        <div className="flex mt-4 gap-4 text-sm uppercase font-normal justify-between no-scrollbar">
                          <span>{post.categories.edges[0].node.name}</span>
                          <span>{formattedDate}</span>
                        </div>
                        <p className="text-2xl font-medium">{post.title}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
}
