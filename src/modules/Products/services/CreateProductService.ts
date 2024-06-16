import { container, inject, injectable } from "tsyringe";
import { Product } from "../entities/Product";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";
import { ICreateProductDTO } from "../dto/ProductDTO";
import { Track } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../../../shared/helpers/apiErrors";
import { CreateCuriosityService } from "./CreateCuriosityService";

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(data: ICreateProductDTO): Promise<Product> {
    // verificar se produto ja existe
    const productAlreadyExists = await this.productRepository.findByNames({ album: data.album, artist: data.artist });

    if (productAlreadyExists) {
      throw new BadRequestError('Produto já cadastrado!');
    }

    const priceGroup = {
      EDICAO_ESPECIAL: 1.20,
      EDICAO_LIMITADA: 1.30,
      EDICAO_NORMAL: 1.10
    }

    // calcular o preco de venda
    const percentual = priceGroup[data.pricingGroup];
    const salePrice = data.costPrice * percentual;

    const tracks = data.tracks.map(track => ({
      name: track.name,
      duration: track.duration,
    }))

    const numberOfTracks = tracks.length.toString();
    const barCode = generateBarcode();

    const createCuriosityService = container.resolve(CreateCuriosityService);
    const curiosity = await createCuriosityService.execute(data.album, data.artist);

    if (!curiosity) {
      throw new NotFoundError('Curiosidade não encontrada');
    }

    const productData = {
      ...data,
      price: salePrice,
      tracks: tracks as Track[],
      numberOfTracks,
      barCode,
      curiosity,
    }

    const product = await this.productRepository.create(productData);
    return product;
  }
}

function generateBarcode(): string {
  return Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
}

export { CreateProductService };

