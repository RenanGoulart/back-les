import { inject, injectable } from "tsyringe";
import { Product } from "../entities/Product";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";
import { ICreateProductDTO } from "../dto/ProductDTO";
import { PricingGroup, Track } from "@prisma/client";

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(data: ICreateProductDTO): Promise<Product> {
    const priceGroup = {
      EDICAO_ESPECIAL: 1.20,
      EDICAO_LIMITADA: 1.30,
      EDICAO_NORMAL: 1.00
    }

    // calcular o preco de venda
    const percentual = priceGroup [data.pricingGroup];
    const salePrice = data.price * percentual;

    // verificar por nome do artista e nome do album se já existe, se sim, retornar erro

    const tracks = data.tracks.map(track => ({
      name: track.name,
      duration: track.duration,
    }))

    const numberOfTracks = tracks.length.toString();
    const barCode = generateBarcode();

    const productData = {
      ...data,
      salePrice: salePrice,
      tracks: tracks as Track[],
      numberOfTracks,
      barCode,
    }

    const product = await this.productRepository.create(productData);
    return product;
  }
}

function generateBarcode(): string {
  return Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
}

export { CreateProductService };

