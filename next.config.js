/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "img.antaranews.com",
      "akcdn.detik.net.id",
      "via.placeholder.com",
    ],
  },
};

module.exports = nextConfig;
