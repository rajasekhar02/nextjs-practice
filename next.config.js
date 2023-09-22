/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  // swcMinify: true,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com'
      },
    ],
  },
};

module.exports = nextConfig;
