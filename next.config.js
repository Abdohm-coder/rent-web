/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
