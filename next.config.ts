import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // 1. Add this line to fix production routing for static exports

  turbopack: {
    root: __dirname,
  },

  reactCompiler: true,

  images: {
    unoptimized: true,
  },

  // 2. NOTE: async headers() are completely ignored by Next.js when using output: "export".
  // You must configure your Content-Security-Policy on your hosting provider platform dashboard instead!
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://www.crediple.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;