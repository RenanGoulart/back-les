import { inject, injectable } from "tsyringe";
import { Product } from "../entities/Product";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";
import { IUpdateProductDTO } from "../dto/ProductDTO";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(id: string, data: IUpdateProductDTO) : Promise<Product> {
    const product = await this.productRepository.findById(id);

    if(!product) {
      throw new NotFoundError('Produto não encontrado');
    }

    Object.assign(product, data);
    const updatedProduct = await this.productRepository.update(product);

    return updatedProduct;
    }
}

export { UpdateProductService };
