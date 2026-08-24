import type { NextConfig } from "next";
import path from "node:path";

const frontendRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.15"],
  outputFileTracingRoot: frontendRoot,
  turbopack: {
    root: frontendRoot,
  },
};

export default nextConfig;
