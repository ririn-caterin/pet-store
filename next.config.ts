import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  }
};

export default nextConfig;
