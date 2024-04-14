import { prisma } from "../../../shared/database";
import { Cart } from "../entities/Cart";
import { ICartRepository } from "./CartRepositoryInterface";
import { ICreateCartRepositoryDTO } from "../dto/CartDTO";

class CartRepository implements ICartRepository {
  async create({ userId, total }: ICreateCartRepositoryDTO): Promise<Cart> {
    const cart = await prisma.cart.create({
      data: {
        userId: userId,
        total: total,
      }
    });
    return { ...cart, cartItems: [] };
  }

  async findById(id: string): Promise<Cart | null> {
    const cart = await prisma.cart.findUnique({
      where: { id },
      include: { cartItems: { include: { product: true } } }
    });
    return cart as Cart;
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { cartItems: { include: { product: true } } }
    });
    return cart as Cart;
  }

  async update(cart: Cart): Promise<Cart> {
    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        total: cart.total,
        cartItems: {
          updateMany: cart.cartItems.map(item => ({
            where: { id: item.id },
            data: {
              quantity: item.quantity,
            }
          }))
        }
      },
      include: { cartItems: { include: { product: true } } }
    });
    return updatedCart as Cart;
  }

  async delete(cartId: string): Promise<void> {
    await prisma.cart.delete({
      where: { id: cartId },
    })
  }

}

export { CartRepository };
