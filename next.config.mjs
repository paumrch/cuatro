/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    loader: "default", // Utiliza el cargador de imágenes predeterminado
    path: "/_next/image", // Ruta para servir las imágenes optimizadas
    deviceSizes: [320, 420, 768, 1024, 1200], // Tamaños de dispositivos para los que se generan imágenes optimizadas
    imageSizes: [16, 32, 48, 64, 96], // Tamaños de imagen para los que se generan imágenes optimizadas
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "http",
        hostname: "wp.4dejunio.com",
        port: "",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
