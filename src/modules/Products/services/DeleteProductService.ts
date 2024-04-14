import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    await this.productRepository.delete(product);
  }
}

export { DeleteProductService };
