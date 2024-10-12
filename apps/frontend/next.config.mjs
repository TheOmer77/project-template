import { join } from 'path';

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  rewrites: () => [
    {
      source: '/api/:path*',
      destination: `${process.env.BACKEND_URL || 'http://backend:8000'}/:path*`,
    },
  ],
  experimental: { outputFileTracingRoot: join(import.meta.dirname, '../../') },
  // ESLint & tsc are used in prebuild script instead
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
