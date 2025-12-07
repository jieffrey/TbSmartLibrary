import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // semua domain HTTPS
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**", // semua domain HTTP
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
