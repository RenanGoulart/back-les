import { prisma } from "../../../shared/database";
import { ICartItemRepository } from "./CartItemRepositoryInterface";
import { ICreateCartItemServiceDTO } from "../dto/CartItemDTO";
import { CartItem } from "../entities/CartItem";

class CartItemRepository implements ICartItemRepository {
  async create( { salePrice, quantity, productId, cartId }: ICreateCartItemServiceDTO): Promise<CartItem> {
    const cartItem = await prisma.cartItem.create({
      data: {
        salePrice,
        quantity,
        productId,
        cartId,
      },
      include: { product: true }
    });

    return cartItem;
  }
}

export { CartItemRepository };
