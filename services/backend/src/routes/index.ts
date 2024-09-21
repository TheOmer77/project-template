import { Hono } from 'hono';

import { HELLO_WORLD } from '@repo/shared';

export const router = new Hono().get('/', ctx =>
  ctx.json({ success: true, message: HELLO_WORLD })
);
