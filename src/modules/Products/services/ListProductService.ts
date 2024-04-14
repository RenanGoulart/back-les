import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";
import { Product } from "../entities/Product";

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(): Promise<Product[] | undefined> {
    const products = await this.productRepository.getAll();

    if (products){
      const productsImagePath = products.map(product => ({
        ...product,
        photo: `http://localhost:3333/uploads/${product.photo}`
      }));

      return productsImagePath;
    } else {
      return undefined;
    }
  }
}

export { ListProductService };
