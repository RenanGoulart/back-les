import express from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();

app.use(cors({
  credentials: true
}))

app.use(express.json());

app.get('/', (request, response) =>
  response.send('VintageVibes API'),
);

app.use(router);

export { app };