import "express-async-errors";
import 'reflect-metadata';
import './container';
import './database';
import './cron/cleanup';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import path from 'path';
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(
  cors({
    credentials: true
  }),
)

app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '..', '..', 'uploads')));

app.use(router);

app.use(errorMiddleware);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});

export { app };
