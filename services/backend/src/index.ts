import express, { json } from 'express';
import cors from 'cors';

import router from 'routes';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(json());
app.use(cors());
app.use(router);

app.listen(PORT, () => console.info(`Backend is running on port ${PORT}.`));
