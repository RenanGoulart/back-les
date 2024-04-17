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

  async execute({ cartId, productId }: IUpdateCartServiceDTO): Promise<Cart | void> {
    const cart = await this.cartRepository.findById(cartId);

    if(!cart) {
      throw new Error('Carrinho não encontrado');
    }

    if (cart.cartItems.length === 1) {
      return await this.cartRepository.delete(cart.id);
    }

    cart.cartItems = cart.cartItems.filter(item => item.productId !== productId);

    cart.total = cart.cartItems.reduce((acc, item) => acc + item.salePrice, 0);

    const updatedCart = await this.cartRepository.update(cart);
    return updatedCart;
  }
}

export { RemoveFromCartService };
