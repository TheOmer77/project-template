import type { NextConfig } from 'next';

const config = {
  output: 'standalone',
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${process.env.BACKEND_URL || 'http://backend:8000'}/:path*`,
    },
  ],
  // ESLint & tsc are used in prebuild script instead
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
} satisfies NextConfig;

export default config;
