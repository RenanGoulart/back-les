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
    throw new Error("Method not implemented.");
  }
  async findByUserId(userId: string): Promise<Cart | null> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<Cart[] | undefined> {
    throw new Error("Method not implemented.");
  }
  async update(cart: Cart): Promise<Cart> {
    throw new Error("Method not implemented.");
  }
  async delete(cartId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export { CartRepository };
