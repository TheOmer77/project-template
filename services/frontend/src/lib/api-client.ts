import { hc } from 'hono/client';

import type { ApiType } from '@repo/backend';

export const apiClient = hc<ApiType>(
  import.meta.env.VITE_BACKEND_URL || '/api'
);
