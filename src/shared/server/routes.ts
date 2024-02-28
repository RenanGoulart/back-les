import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', (request: Request, response: Response) =>
  response.send('VintageVibes API'),
);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };
