import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ["app", "components", "lib", "pages", "public", "styles"],
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
