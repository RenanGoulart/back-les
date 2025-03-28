import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { IUpdateCartServiceDTO } from "../dto/CartDTO";
import { Cart } from "../entities/Cart";
import { IProductRepository } from '../../Products/repositories/ProductRepositoryInterface';
import { ICartItemRepository } from "../repositories/CartItemRepositoryInterface";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class AddToCartService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('CartItemRepository')
    private cartItemRepository: ICartItemRepository,
    @inject('CartRepository')
    private cartRepository: ICartRepository
  ) {}

  async execute({ cartId, productId }: IUpdateCartServiceDTO) : Promise<Cart> {
    const cart = await this.cartRepository.findById(cartId);

    if(!cart) {
      throw new NotFoundError('Carrinho não encontrado');
    }

    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado');
    }

    if (product.quantityInStock - product.reservedStock < 1) {
      throw new NotFoundError('Produto fora de estoque');
    }

    const hasProductOnCart = cart.cartItems.find(item => item.productId === productId);

    if (hasProductOnCart) {
      cart.cartItems = cart.cartItems.map(item => {
        if (item.productId === productId) {
          item.quantity += 1;
          item.salePrice = item.product.price * item.quantity;
        }
        return item;
      });
    } else {
      const cartItem = await this.cartItemRepository.create({ cartId: cart.id, productId: product.id, quantity: 1, salePrice: product.price });
      cart.cartItems = [...cart.cartItems, cartItem];
    }

    cart.total = cart.cartItems.reduce((acc, item) => {
      acc += item.salePrice;
      return acc;
    }, 0);

    // reservar no estoque
    await this.productRepository.updateReserveInStock(product.id, 1);

    const updatedCart = await this.cartRepository.update(cart);
    return updatedCart;
  }
}

export { AddToCartService };
