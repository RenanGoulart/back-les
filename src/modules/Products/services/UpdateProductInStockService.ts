import { inject, injectable } from "tsyringe";
import { Product } from "../entities/Product";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";
import { IUpdateProductInStockDTO } from "../dto/ProductDTO";
import { BadRequestError, NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class UpdateProductInStockService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({id, quantityInStock, costPrice} : IUpdateProductInStockDTO) : Promise<Product> {
    if(quantityInStock <= 0) {
      throw new BadRequestError('A quantidade em estoque não pode ser menor ou igual a 0');
    }

    if(costPrice <= 0) {
      throw new BadRequestError('O preço de custo não pode ser menor ou igual a 0');
    }

    const product = await this.productRepository.findById(id);
    if(!product) {
      throw new NotFoundError('Produto não encontrado');
    }

    const priceGroup = {
      EDICAO_ESPECIAL: 1.20,
      EDICAO_LIMITADA: 1.30,
      EDICAO_NORMAL: 1.10
    }

    // calcular o preco de venda
    const percentual = priceGroup[product.pricingGroup];
    const salePrice = product.costPrice * percentual;

    product.costPrice = costPrice;
    product.price = salePrice;
    product.quantityInStock = quantityInStock;

    const updatedProduct = await this.productRepository.update(product);

    return updatedProduct;
  }
}

export { UpdateProductInStockService };
