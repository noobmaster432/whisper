/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 194978719,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "113d99694e59aea703178046fa95f5d7",
  },
  images: {
    domains: ["localhost", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
