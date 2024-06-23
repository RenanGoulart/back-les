import { Router, Request, Response, NextFunction } from 'express';
import { addressRouter } from '../modules/Address/routes/addressRoutes';
import { creditCardRouter } from '../modules/CreditCard/routes/creditCardRoutes';
import { authUserRouter, userRouter } from '../modules/User/routes/userRoutes';
import { productRouter } from '../modules/Products/routes/productRoutes';
import { chatRouter } from '../modules/Products/routes/chatRoutes';
import { cartRouter } from '../modules/Cart/routes/cartRoutes';
import { couponRouter } from '../modules/Coupon/routes/couponRoutes';
import { orderRouter } from '../modules/Order/routes/orderRoutes';

const router = Router();

router.use('/login', authUserRouter)
router.use('/address', addressRouter);
router.use('/creditCard', creditCardRouter);
router.use('/user', userRouter);
router.use('/product', productRouter)
router.use('/chat', chatRouter)
router.use('/cart', cartRouter)
router.use('/coupon', couponRouter)
router.use('/order', orderRouter)

router.get('/', (request: Request, response: Response) =>
  response.send('VintageVibes API'),
);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };
