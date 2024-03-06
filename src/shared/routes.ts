import { Router, Request, Response, NextFunction } from 'express';
import { addressRouter } from '../modules/Address/routes/addressRoutes';
import { creditCardRouter } from '../modules/CreditCard/routes/creditCardRoutes';
import { userRouter } from '../modules/User/routes/userRoutes';

const router = Router();

router.use('/address', addressRouter);
router.use('/creditCard', creditCardRouter);
router.use('/user', userRouter);

router.get('/', (request: Request, response: Response) =>
  response.send('VintageVibes API'),
);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };
