import Head from "next/head";
import "./globals.css";
import localFont from "next/font/local";
import SmoothScrolling from "../components/smoothScrolling";
import { Analytics } from "@vercel/analytics/react"

const myFont = localFont({
  src: [
    {
      path: "./fonts/BasisGrotesquePro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
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

export default function RootLayout({ children, metadata = {} }) {
  return (
    <html lang="es" className={myFont.className}>
      <Head>
        <link rel="icon" href="/icon.png" sizes="any" />
        <meta name="description" content={metadata?.description} />
        <link rel="canonical" href={metadata?.canonicalUrl} />
      </Head>
      <body className="text-stone-900 bg-stone-50">
        <SmoothScrolling>{children}</SmoothScrolling>
        <Analytics />
      </body>
    </html>
  );
}
