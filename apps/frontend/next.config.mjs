import { join } from 'path';

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: join(import.meta.dirname, '../../'),
  },
};

export default config;
