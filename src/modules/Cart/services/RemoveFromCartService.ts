import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { IUpdateCartServiceDTO } from "../dto/CartDTO";
import { Cart } from "../entities/Cart";

@injectable()
class RemoveFromCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository
  ) {}

  async execute({ cartId, productId }: IUpdateCartServiceDTO): Promise<Cart> {
    const cart = await this.cartRepository.findById(cartId);

    if(!cart) {
      throw new Error('Carrinho não encontrado');
    }

    if (cart.cartItems.length === 1) {
      await this.cartRepository.delete(cartId);
    }

    cart.cartItems = cart.cartItems.filter(item => item.productId !== productId);

    return cart;
  }
}

export { RemoveFromCartService };
