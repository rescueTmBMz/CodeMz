/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // gera a pasta `out/`, publicável em qualquer alojamento estático
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
