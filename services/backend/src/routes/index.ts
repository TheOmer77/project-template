import { Router } from 'express';
import { HELLO_WORLD } from '@theomer77/some-package';

const router = Router();

router.get('/', (req, res) => {
  res.send({ success: true, message: HELLO_WORLD });
});

export default router;
