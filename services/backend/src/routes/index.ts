import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.send({ success: true, message: 'Hello world!' });
});

export default router;
