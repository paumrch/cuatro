import "./globals.css";
import localFont from "next/font/local";
import SmoothScrolling from "../components/smoothScrolling";
import { Analytics } from "@vercel/analytics/react";
import Transition from "@/components/transition";
import JsonLd, { getOrganizationJsonLd, getWebSiteJsonLd } from "@/components/JsonLd";

export const metadata = {
  metadataBase: new URL("https://4dejunio.com"),
  title: {
    default: "4 de Junio — Agencia Creativa en Valencia",
    template: "%s | 4 de Junio",
  },
  description:
    "Agencia creativa en Valencia especializada en branding, diseño y desarrollo web, y estrategia digital. Acompañamos tu proyecto desde su nacimiento.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://4dejunio.com",
    siteName: "4 de Junio",
    title: "4 de Junio — Agencia Creativa en Valencia",
    description:
      "Agencia creativa en Valencia especializada en branding, diseño y desarrollo web, y estrategia digital.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://4dejunio.com",
  },
};

const myFont = localFont({
  src: [
    {
      path: "./fonts/BasisGrotesquePro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesquePro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesquePro-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/BasisGrotesquePro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesquePro-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/BasisGrotesquePro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesquePro-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/BasisGrotesquePro-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/BasisGrotesquePro-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesquePro-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={myFont.className}>
      <body className="text-stone-900 bg-stone-50">
        <JsonLd data={getOrganizationJsonLd()} />
        <JsonLd data={getWebSiteJsonLd()} />
        <SmoothScrolling>
          <Transition>{children}</Transition>
        </SmoothScrolling>
        <Analytics />
      </body>
    </html>
  );
}
