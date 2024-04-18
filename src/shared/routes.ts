import { Router, Request, Response, NextFunction } from 'express';
import { addressRouter } from '../modules/Address/routes/addressRoutes';
import { creditCardRouter } from '../modules/CreditCard/routes/creditCardRoutes';
import { userRouter } from '../modules/User/routes/userRoutes';
import { productRouter } from '../modules/Products/routes/productRoutes';
import { cartRouter } from '../modules/Cart/routes/cartRoutes';
import { couponRouter } from '../modules/Coupon/routes/couponRoutes';

const router = Router();

router.use('/address', addressRouter);
router.use('/creditCard', creditCardRouter);
router.use('/user', userRouter);
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/coupon', couponRouter)

router.get('/', (request: Request, response: Response) =>
  response.send('VintageVibes API'),
);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };
