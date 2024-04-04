import { Hono } from 'hono';
import { HELLO_WORLD } from '@theomer77/some-package';

const router = new Hono();

router.get('/', ctx => ctx.json({ success: true, message: HELLO_WORLD }));

export default router;
