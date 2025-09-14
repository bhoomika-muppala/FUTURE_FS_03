// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  eslint: {
    // 🚀 This skips ESLint during "next build"
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
