import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { getAllPublishedPosts } from "@/lib/api";
import { format } from "date-fns";
import JsonLd, { getBreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Blog",
  description:
    "Artículos sobre branding, diseño web, estrategia digital y marketing para empresas. Reflexiones y consejos del equipo de 4 de Junio.",
  alternates: {
    canonical: "https://4dejunio.com/blog",
  },
  openGraph: {
    title: "Blog | 4 de Junio",
    description:
      "Artículos sobre branding, diseño web y estrategia digital para empresas que quieren crecer.",
    url: "https://4dejunio.com/blog",
    type: "website",
  },
};

export default async function BlogIndex() {
  const postsData = await getAllPublishedPosts();

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Inicio", url: "https://4dejunio.com" },
          { name: "Blog", url: "https://4dejunio.com/blog" },
        ])}
      />
      <Navbar />
      <div className="mx-auto px-6 pb-8 lg:px-8">
        <div className="py-8 sm:py-12 lg:pb-12">
          <div className="mx-auto">
            <h1 className="text-4xl md:text-5xl font-medium">Blog</h1>
            <p className="mt-4 text-lg text-stone-600 max-w-2xl">
              Ideas, reflexiones y consejos prácticos sobre branding, diseño web
              y estrategia digital.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 sm:mt-16">
              {postsData.edges.map(({ node: post }) => {
                const formattedDate = format(
                  new Date(post.date),
                  "dd.MM.yyyy"
                );
                return (
                  <article key={post.slug} className="flex flex-col gap-4">
                    {post.featuredImage?.node?.sourceUrl && (
                      <Link href={`/blog/${post.slug}`}>
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            width={1080}
                            height={607}
                            className="rounded-lg object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>
                    )}
                    <div>
                      <div className="flex mt-2 gap-4 text-sm uppercase font-normal justify-between text-stone-500">
                        <span>
                          {post.categories?.edges?.[0]?.node?.name || "Blog"}
                        </span>
                        <span>{formattedDate}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-xl font-medium mt-2 hover:underline">
                          {post.title}
                        </h2>
                      </Link>
                      {post.excerpt && (
                        <p
                          className="text-stone-600 mt-2 text-sm line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {postsData.edges.length === 0 && (
              <p className="text-stone-500 mt-12 text-lg">
                Próximamente publicaremos contenido aquí. ¡Vuelve pronto!
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
