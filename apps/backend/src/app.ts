import { Hono } from 'hono';

import { router } from '@/routes';

export const app = new Hono().route('/', router);
