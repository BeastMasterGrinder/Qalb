import type { NextConfig } from "next";
const createMDX = require('@next/mdx')

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ["app", "components", "lib", "pages", "public", "styles"],
    ignoreDuringBuilds: true,
  },
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX(nextConfig); 

export default nextConfig;
