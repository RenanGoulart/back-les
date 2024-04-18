import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { Cart } from "../entities/Cart";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class FindCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository
  ) {}

  async execute(id: string): Promise<Cart | null> {
    const cart = await this.cartRepository.findByUserId(id);

    if (!cart) {
      throw new NotFoundError('Carrinho não encontrado!');
    }

    const cartItemsWithImage = cart.cartItems.map(item => ({
      ...item,
      product: {
        ...item.product,
        photo: `http://localhost:3333/uploads/${item.product.photo}`
      }
    }));

    return { ...cart, cartItems: cartItemsWithImage };
  }
}

export { FindCartService };
