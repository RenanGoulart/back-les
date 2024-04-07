import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { IUpdateCartServiceDTO } from "../dto/CartDTO";
import { Cart } from "../entities/Cart";

@injectable()
class SubtractFromCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository
  ) {}

  async execute({ cartId, productId }: IUpdateCartServiceDTO) : Promise<Cart> {
    const cart = await this.cartRepository.findById(cartId);

    if(!cart) {
      throw new Error('Carrinho não encontrado');
    }

    const hasProductOnCart = cart.cartItems.find(item => item.productId === productId);

    if (!hasProductOnCart) {
      throw new Error('Produto não encontrado no carrinho');
    }

    cart.cartItems = cart.cartItems.map(item => {
      if (item.productId === productId) {
        if (item.quantity === 1) {
          throw new Error('Quantidade mínima atingida');
        }
        item.quantity -= 1;
        item.salePrice = item.salePrice * item.quantity;
      }
      return item;
    });

    cart.total = cart.cartItems.reduce((acc, item) => {
      acc += item.salePrice;
      return acc;
    }, 0);

    return cart;
  }
}

export { SubtractFromCartService };
