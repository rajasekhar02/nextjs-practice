/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
  transpilePackages: ["firebase"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
};

module.exports = nextConfig;
