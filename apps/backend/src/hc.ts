import { hc as honoClient } from 'hono/client';

import type { app } from '@/app';

const client = honoClient<typeof app>('');
export type ApiType = typeof client;

export const hc = (...args: Parameters<typeof honoClient>): ApiType =>
  honoClient<typeof app>(...args);
