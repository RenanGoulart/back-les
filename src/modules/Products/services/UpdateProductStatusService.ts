import { inject, injectable } from "tsyringe";
import { Product } from "../entities/Product";
import { IUpdateProductStatusDTO } from "../dto/ProductDTO";
import { BadRequestError, NotFoundError } from "../../../shared/helpers/apiErrors";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";

@injectable()
class UpdateProductStatusService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({ id, status, statusReason } : IUpdateProductStatusDTO) : Promise<Product> {
    const product = await this.productRepository.findById(id);
    if(!product) {
      throw new NotFoundError('Produto não encontrado');
    }

    const updatedProduct = await this.productRepository.updateStatus({id, status, statusReason});

    return updatedProduct;
  }
}

export { UpdateProductStatusService };
