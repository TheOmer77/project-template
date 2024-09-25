import { serve } from '@hono/node-server';

import { app } from './app';

serve(
  { fetch: app.fetch, port: Number(process.env.PORT) || 8000 },
  ({ port }) => console.info(`Backend is running on port ${port}.`)
);

export type ApiType = typeof app;
