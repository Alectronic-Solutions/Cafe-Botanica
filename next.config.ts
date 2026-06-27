import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Cafe-Botanica",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/Cafe-Botanica",
  },
};

export default nextConfig;
