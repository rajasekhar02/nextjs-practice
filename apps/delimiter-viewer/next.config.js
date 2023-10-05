/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [['@swc-jotai/react-refresh', {}]],
    },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "media.licdn.com",
          },
        ],
      },
}

module.exports = nextConfig
