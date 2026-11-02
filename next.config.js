/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/pgn-website-main",
  assetPrefix: "/pgn-website-main",

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
