
import { ICreateCartItemServiceDTO } from "../dto/CartItemDTO";
import { CartItem } from "../entities/CartItem";

interface ICartItemRepository {
  create(cartItem: ICreateCartItemServiceDTO): Promise<CartItem>;
}

export { ICartItemRepository };
