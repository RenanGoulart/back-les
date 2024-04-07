import { ICreateCartRepositoryDTO } from "../dto/CartDTO";
import { Cart } from "../entities/Cart";

interface ICartRepository {
  create(cart: ICreateCartRepositoryDTO): Promise<Cart>;
  findById(id: string): Promise<Cart | null>;
  findByUserId(userId: string): Promise<Cart | null>;
  update(cart: Cart): Promise<Cart>;
  delete(cartId: string): Promise<void>;
}

export { ICartRepository };
