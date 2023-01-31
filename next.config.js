/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "img.antaranews.com",
      "akcdn.detik.net.id",
      "via.placeholder.com",
      "admin.kuakmedia.co",
      "detakpolitika.kuakmedia.co",
      "detakpolitika.m-andreansaefudin.com",
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
