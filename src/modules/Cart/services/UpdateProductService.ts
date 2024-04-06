import { inject, injectable } from "tsyringe";
import { Product } from "../entities/Cart";
import { IProductRepository } from "../repositories/CartRepositoryInterface";
import { IUpdateProductDTO } from "../dto/UpdateProductDTO";

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(id: string, data: IUpdateProductDTO) : Promise<Product> {
    const product = await this.productRepository.findById(id);

    if(!product) {
        throw new Error('Produto não encontrado');
    }

    product.artist = data.artist;
    product.album = data.album;
    product.year = data.year;
    product.producer = data.producer;
    product.numberOfTracks = data.numberOfTracks;
    product.height = data.height;
    product.width = data.width;
    product.weight = data.weight;
    product.pricingGroup = data.pricingGroup;
    product.categories = data.categories;
    product.barCode = data.barCode;
    product.price = data.price;

    const updatedProduct = await this.productRepository.update(product);

    return updatedProduct;
    }
}

export { UpdateProductService };
