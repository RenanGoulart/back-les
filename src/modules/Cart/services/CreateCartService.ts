import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { IProductRepository } from '../../Products/repositories/ProductRepositoryInterface';
import { ICreateCartServiceDTO } from "../dto/CartDTO";
import { Cart } from "../entities/Cart";
import { ICartItemRepository } from "../repositories/CartItemRepositoryInterface";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

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
      throw new NotFoundError('Produto não encontrado!');
    }

    if (product.quantityInStock - product.reservedStock < 1) {
      throw new NotFoundError('Produto fora de estoque');
    }

    const cart = await this.cartRepository.create({ userId, total: product.price });

    const cartItem = await this.cartItemRepository.create({ cartId: cart.id, productId: product.id, quantity: 1, salePrice: product.price });
    cart.cartItems = [cartItem];

    // reservar no estoque
    await this.productRepository.updateReserveInStock(product.id, 1);

    return cart;
  }
}

export { CreateCartService };
