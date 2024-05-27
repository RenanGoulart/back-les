import cron from 'node-cron';
import { container } from 'tsyringe';
import { prisma } from '../database';
import { RemoveFromCartService } from '../../modules/Cart/services/RemoveFromCartService';

const timeToExpire = 30; // 30 minutos

cron.schedule(`*/${timeToExpire} * * * *`, async () => {
  const expirationTime = new Date(Date.now() - timeToExpire * 60 * 1000);

  const removeFromCartService = container.resolve(RemoveFromCartService);

  console.log('rodou o cron')

  const expiredItems = await prisma.cartItem.findMany({
    where: {
      createdAt: {
        lt: expirationTime,
      },
    },
  });

  if(!expiredItems) {
    return;
  }

  for (const item of expiredItems) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { reservedStock: { decrement: item.quantity } },
    });

    return await removeFromCartService.execute({ cartId: item.cartId, productId: item.productId });
  }
});
