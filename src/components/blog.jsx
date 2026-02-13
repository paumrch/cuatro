import { getAllPostsForHome } from "@/lib/api";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

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
            <div className="text-left w-full sm:w-1/2 mt-8 mb-10">
              <h2 className="text-3xl">Blog</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {postsForHome.edges.map(({ node: post }) => {
                const formattedDate = dateFormatter.format(new Date(post.date));
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col justify-between rounded-lg border border-stone-200 p-6 cursor-pointer hover:border-stone-400 hover:shadow-sm transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-xs uppercase text-stone-500 tracking-wide">
                          {post.categories.edges[0]?.node?.name || "Blog"}
                        </span>
                        <ArrowUpRightIcon className="w-4 h-4 text-stone-300 group-hover:text-stone-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-medium mt-3 text-balance">
                        {post.title}
                      </h3>
                    </div>
                    <span className="text-sm text-stone-400 mt-4">
                      {formattedDate}
                    </span>
                  </Link>
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
