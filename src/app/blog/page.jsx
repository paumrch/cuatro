import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { getAllPublishedPosts } from "@/lib/api";
import JsonLd, { getBreadcrumbJsonLd } from "@/components/JsonLd";

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

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
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-balance">Blog</h1>
            <p className="mt-4 text-lg text-stone-600 max-w-2xl">
              Ideas, reflexiones y consejos prácticos sobre branding, diseño web
              y estrategia digital.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 sm:mt-16">
              {postsData.edges.map(({ node: post }) => {
                const formattedDate = dateFormatter.format(
                  new Date(post.date)
                );
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col justify-between rounded-lg border border-stone-200 p-6 cursor-pointer hover:border-stone-400 hover:shadow-sm transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-xs uppercase text-stone-500 tracking-wide">
                          {post.categories?.edges?.[0]?.node?.name || "Blog"}
                        </span>
                        <span className="text-xs text-stone-400">
                          {formattedDate}
                        </span>
                      </div>
                      <h2 className="text-lg font-medium mt-3 text-balance">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p
                          className="text-sm text-stone-500 mt-2 line-clamp-3 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                      )}
                    </div>
                  </Link>
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
