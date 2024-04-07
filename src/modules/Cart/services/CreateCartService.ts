import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { IProductRepository } from '../../Products/repositories/ProductRepositoryInterface';
import { ICreateCartServiceDTO } from "../dto/CartDTO";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { ICartItemRepository } from "../repositories/CartItemRepositoryInterface";

@injectable()
class CreateCartService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('CartRepository')
    private cartRepository: ICartRepository,
    @inject('CartItemRepository')
    private cartItemRepository: ICartItemRepository,
  ) {}

  async execute({ userId, productId }: ICreateCartServiceDTO): Promise<Cart> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error('Produto não encontrado!');
    }

    const cart = await this.cartRepository.create({ userId, total: product.price });

    if (!cart) {
      throw new Error('Carrinho não encontrado!');
    }

    const cartItem = await this.cartItemRepository.create({ cartId: cart.id, productId: product.id, quantity: 1, salePrice: product.price });
    cart.cartItems = [cartItem];

    return cart;
  }
}

export { CreateCartService };
