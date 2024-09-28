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
  experimental: {
    outputFileTracingRoot: join(import.meta.dirname, '../../'),
  },
};

export default config;
