import { hc as honoClient } from 'hono/client';

import type { app } from '@/app';

// Only using as type is intentional here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = honoClient<typeof app>('');
export type ApiType = typeof client;

export const hc = (...args: Parameters<typeof honoClient>): ApiType =>
  honoClient<typeof app>(...args);
