import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@physicsquest/dag", "@physicsquest/fsrs", "@physicsquest/tutor"],
  experimental: {
    // Server actions are stable in Next 15 but we enable the flag for clarity
    serverActions: {
      allowedOrigins: ["localhost:3010"],
    },
  },
};

export default nextConfig;
