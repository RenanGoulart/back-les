import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../repositories/CartRepositoryInterface";
import { Product } from "../entities/Cart";

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(): Promise<Product[] | undefined> {
    const products = await this.productRepository.getAll();
    return products;
  }
}

export { ListProductService };
