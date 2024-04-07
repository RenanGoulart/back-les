import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { Cart } from "../entities/Cart";

@injectable()
class ListCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository
  ) {}

  async execute(userId: string): Promise<Cart | null> {
    const cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      throw new Error('Carrinho não encontrado!');
    }

    return cart;
  }
}

export { ListCartService };
