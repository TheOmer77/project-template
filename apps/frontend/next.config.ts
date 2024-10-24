import type { NextConfig } from 'next';
import { join } from 'path';

const config = {
  output: 'standalone',
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${process.env.BACKEND_URL || 'http://backend:8000'}/:path*`,
    },
  ],
  outputFileTracingRoot: join(__dirname, '../../'),
  // ESLint & tsc are used in prebuild script instead
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
} satisfies NextConfig;

export default config;
