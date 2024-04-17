import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";
import { Product } from "../entities/Product";

@injectable()
class FindProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(productId: string): Promise<Product | null> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error('Product não encontrado');
    }

    return { ...product, photo: `http://localhost:3333/uploads/${product.photo}` };
  }
}

export { FindProductService };
