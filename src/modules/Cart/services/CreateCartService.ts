import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { IProductRepository } from "@modules/Products/repositories/ProductRepositoryInterface";
import { ICreateCartServiceDTO } from "../dto/CartDTO";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";

@injectable()
class CreateCartService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) {}

  async execute({ userId, productId }: ICreateCartServiceDTO): Promise<Cart> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error('Produto não encontrado!');
    }

    const cartItem = new CartItem();
    const cart = await this.cartRepository.create({ userId, total: product.price });

    if (cart) {
      Object.assign(cartItem, {
        quantity: 1,
        productId: product.id,
        cartId: cart.id,
      });
      cart.cartItems = [cartItem];
    }

    return cart;
  }
}

export { CreateCartService };
