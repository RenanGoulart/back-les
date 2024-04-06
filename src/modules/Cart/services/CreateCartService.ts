import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../repositories/CartRepositoryInterface";
import { IProductRepository } from "@modules/Products/repositories/ProductRepositoryInterface";
import { ICreateCartServiceDTO } from "../dto/CreateCartDTO";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { CartStatus } from "@prisma/client";

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
    const cart = this.cartRepository.create({ userId, total: product.price, status: CartStatus.ABERTO });


    return cart;
  }
}

export { CreateCartService };
