import 'reflect-metadata';
import './container';
import './database';
import express from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();

app.use(
  cors({
    credentials: true
  }),
)

app.use(express.json());

app.use(router);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});

export { app };
