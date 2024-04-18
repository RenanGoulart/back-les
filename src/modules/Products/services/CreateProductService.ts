import { inject, injectable } from "tsyringe";
import { Product } from "../entities/Product";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";
import { ICreateProductDTO } from "../dto/ProductDTO";

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(data: ICreateProductDTO): Promise<Product> {
    const product = await this.productRepository.create(data);
    return product;
  }
}

export { CreateProductService };
