export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Datos estructurados de la Organización (para el layout / homepage)
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "4 de Junio",
    url: "https://4dejunio.com",
    logo: "https://4dejunio.com/icon.png",
    description:
      "Agencia creativa en Valencia especializada en branding, diseño y desarrollo web, y estrategia digital.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pasaje Dr. Bartual Moret 8 - 6",
      addressLocality: "Valencia",
      postalCode: "46010",
      addressCountry: "ES",
    },
    email: "hola@4dejunio.com",
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      name: "Pau March",
      jobTitle: "Founder & Creative Director",
      url: "https://linkedin.com/in/paumrch/",
    },
    sameAs: [
      "https://linkedin.com/company/4dejunio/",
      "https://instagram.com/4dejunio_",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hola@4dejunio.com",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
  };
}

// Datos estructurados para artículos del blog
export function getArticleJsonLd({ title, description, slug, date, image, author }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image || undefined,
    url: `https://4dejunio.com/blog/${slug}`,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author || "4 de Junio",
    },
    publisher: {
      "@type": "Organization",
      name: "4 de Junio",
      logo: {
        "@type": "ImageObject",
        url: "https://4dejunio.com/icon.png",
      },
    },
  };
}

// Datos estructurados para proyectos creativos
export function getCreativeWorkJsonLd({ title, description, slug, image, category }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: description,
    url: `https://4dejunio.com/work/${slug}`,
    image: image || undefined,
    genre: category || "Diseño",
    creator: {
      "@type": "Organization",
      name: "4 de Junio",
      url: "https://4dejunio.com",
    },
  };
}

// Datos estructurados BreadcrumbList
export function getBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Datos estructurados para la página web principal
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "4 de Junio",
    url: "https://4dejunio.com",
    description:
      "Agencia creativa en Valencia especializada en branding, diseño y desarrollo web, y estrategia digital.",
    publisher: {
      "@type": "Organization",
      name: "4 de Junio",
    },
    inLanguage: "es",
  };
}
