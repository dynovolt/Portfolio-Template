/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "api.microlink.io", "github.com", "avatars.githubusercontent.com"],
  },
};

export default nextConfig;
