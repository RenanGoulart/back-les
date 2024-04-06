import { prisma } from "../../../shared/database";
import { Cart } from "../entities/Cart";
import { ICartRepository } from "./CartRepositoryInterface";
import { ICreateCartRepositoryDTO } from "../dto/CreateCartDTO";

class CartRepository implements ICartRepository {
  async create(cart: ICreateCartRepositoryDTO): Promise<Cart> {
    throw new Error("Method not implemented.");
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
