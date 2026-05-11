import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.freeimages.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
