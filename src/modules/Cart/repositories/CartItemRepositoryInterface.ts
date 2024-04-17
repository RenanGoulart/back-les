
import { ICreateCartItemServiceDTO } from "../dto/CartItemDTO";
import { CartItem } from "../entities/CartItem";

interface ICartItemRepository {
  create(cartItem: ICreateCartItemServiceDTO): Promise<CartItem>;
  delete(cartItemId: string): Promise<void>;
}

export { ICartItemRepository };
