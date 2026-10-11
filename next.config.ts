import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 uses Turbopack for `next build` by default; npm scripts also pass
  // `--turbopack` so the compiler stays explicit for reviewers.
  reactStrictMode: true,
  allowedDevOrigins: ["terminal.local"],
};

export default nextConfig;
