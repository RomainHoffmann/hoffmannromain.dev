import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 90, 100],
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
