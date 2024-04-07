import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { IUpdateCartServiceDTO } from "../dto/CartDTO";
import { Cart } from "../entities/Cart";
import { IProductRepository } from '../../Products/repositories/ProductRepositoryInterface';
import { CartItem } from "../entities/CartItem";

@injectable()
class AddFromCartService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('CartRepository')
    private cartRepository: ICartRepository
  ) {}

  async execute({ cartId, productId }: IUpdateCartServiceDTO) : Promise<Cart> {
    const cart = await this.cartRepository.findById(cartId);

    if(!cart) {
      throw new Error('Carrinho não encontrado');
    }

    const hasProductOnCart = cart.cartItems.find(item => item.productId === productId);

    if (hasProductOnCart) {
      cart.cartItems = cart.cartItems.map(item => {
        if (item.productId === productId) {
          item.quantity += 1;
          item.salePrice = item.salePrice * item.quantity;
        }
        return item;
      });
    } else {
      const cartItem = new CartItem();
      const product = await this.productRepository.findById(productId);

      if (!product) {
        throw new Error('Produto não encontrado');
      }

      Object.assign(cartItem, {
        salePrice: product.price,
        quantity: 1,
        productId,
        cartId,
      });
      cart.cartItems = [...cart.cartItems, cartItem];
    }

    cart.total = cart.cartItems.reduce((acc, item) => {
      acc += item.salePrice;
      return acc;
    }, 0);

    return cart;
  }
}

export { AddFromCartService };
