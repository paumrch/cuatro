import Image from "next/image";
import { getAllPostsForHome } from "@/lib/api";
import { format } from 'date-fns';

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
              {postsForHome.edges.map(({ node: post }) => {
                const formattedDate = format(new Date(post.date), 'dd.MM.yyyy');
                return (
                  <div key={post.slug} className="flex flex-col gap-4">
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        width={1080}
                        height={1080}
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </div>
                    <div>
                    <div className="flex gap-4 text-sm uppercase font-normal justify-between">
                        <span>{post.categories.edges[0].node.name}</span>
                        <span>{formattedDate}</span>
                      </div>
                      <p className="text-2xl font-semibold">{post.title}</p>
                    </div>
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
