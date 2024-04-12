import Head from "next/head";
import "./globals.css";

import Navbar from "@/components/navbar";

export const metadata = {
  title: "4 de Junio",
  description: "Agencia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
