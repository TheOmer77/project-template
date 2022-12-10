import express from 'express';
import cors from 'cors';

import router from 'routes';

const PORT = process.env.port || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.info(`Backend is running on port ${PORT}.`);
});
