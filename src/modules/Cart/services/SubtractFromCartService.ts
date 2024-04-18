import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { IUpdateCartServiceDTO } from "../dto/CartDTO";
import { Cart } from "../entities/Cart";
import { BadRequestError, NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class SubtractFromCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository
  ) {}

  async execute({ cartId, productId }: IUpdateCartServiceDTO) : Promise<Cart> {
    const cart = await this.cartRepository.findById(cartId);

    if(!cart) {
      throw new NotFoundError('Carrinho não encontrado');
    }

    const hasProductOnCart = cart.cartItems.find(item => item.productId === productId);

    if (!hasProductOnCart) {
      throw new NotFoundError('Produto não encontrado no carrinho');
    }

    cart.cartItems = cart.cartItems.map(item => {
      if (item.productId === productId) {
        if (item.quantity === 1) {
          throw new BadRequestError('Quantidade mínima atingida');
        }
        item.quantity -= 1;
        item.salePrice = item.product.price * item.quantity;
      }
      return item;
    });

    cart.total = cart.cartItems.reduce((acc, item) => {
      acc += item.salePrice;
      return acc;
    }, 0);

    const updatedCart = await this.cartRepository.update(cart);
    return updatedCart;
  }
}

export { SubtractFromCartService };
