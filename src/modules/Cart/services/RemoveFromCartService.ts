import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { IUpdateCartServiceDTO } from "../dto/CartDTO";
import { Cart } from "../entities/Cart";
import { ICartItemRepository } from "../repositories/CartItemRepositoryInterface";
import { NotFoundError } from "../../../shared/helpers/apiErrors";
import { IProductRepository } from "../../Products/repositories/ProductRepositoryInterface"

@injectable()
class RemoveFromCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
    @inject('CartItemRepository')
    private cartItemRepository: ICartItemRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({ cartId, productId }: IUpdateCartServiceDTO): Promise<Cart | void> {
    const cart = await this.cartRepository.findById(cartId);

    if(!cart) {
      throw new NotFoundError('Carrinho não encontrado');
    }

    if (cart.cartItems.length === 1) {
      return await this.cartRepository.delete(cart.id);
    }

    const cartItem = cart.cartItems.find(item => item.productId === productId);
    if (!cartItem) {
      throw new NotFoundError('Produto não encontrado no carrinho');
    }

    // liberar reserva do estoque
    const quantityToFreeStock = cartItem.quantity * -1;
    await this.productRepository.updateReserveInStock(productId, quantityToFreeStock);

    await this.cartItemRepository.delete(cartItem.id);

    cart.cartItems = cart.cartItems.filter(item => item.productId !== productId);
    cart.total = cart.cartItems.reduce((acc, item) => acc + item.salePrice, 0);

    const updatedCart = await this.cartRepository.update(cart);
    return updatedCart;
  }
}

export { RemoveFromCartService };
