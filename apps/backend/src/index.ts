import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { router } from '@/routes';

const app = new Hono().route('/', router);

serve(
  { fetch: app.fetch, port: Number(process.env.PORT) || 8000 },
  ({ port }) => console.info(`Backend is running on port ${port}.`)
);

export type ApiType = typeof app;
