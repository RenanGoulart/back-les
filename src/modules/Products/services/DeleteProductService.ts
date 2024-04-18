import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Produto não encontrado');
    }

    await this.productRepository.delete(product);
  }
}

export { DeleteProductService };
