import express from 'express';
import cors from 'cors';
import routes from '@src/api/routes';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use('/', routes);
