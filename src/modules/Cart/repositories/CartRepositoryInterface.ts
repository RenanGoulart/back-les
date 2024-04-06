import { ICreateCartRepositoryDTO } from "../dto/CreateCartDTO";
import { Cart } from "../entities/Cart";

interface ICartRepository {
  create(cart: ICreateCartRepositoryDTO): Promise<Cart>;
  findById(id: string): Promise<Cart | null>;
  findByUserId(userId: string): Promise<Cart | null>;
  getAll(): Promise<Cart[] | undefined>;
  update(cart: Cart): Promise<Cart>;
  delete(cartId: string): Promise<void>;
}

export { ICartRepository };
