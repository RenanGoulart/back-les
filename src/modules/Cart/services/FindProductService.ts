import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../repositories/CartRepositoryInterface";
import { Product } from "../entities/Cart";

@injectable()
class FindProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(productId: string): Promise<Product | null> {
    const product = await this.productRepository.findById(productId);
    return product;
  }
}

export { FindProductService };
