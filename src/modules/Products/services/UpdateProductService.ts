import { inject, injectable } from "tsyringe";
import { Product } from "../entities/Product";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";
import { ITrackRepository } from "../repositories/TrackRepositoryInterface";
import { IUpdateProductDTO } from "../dto/ProductDTO";
import { BadRequestError, NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('TrackRepository')
    private trackRepository: ITrackRepository,
  ) {}

  async execute(id: string, data: IUpdateProductDTO) : Promise<Product> {
    if(data.quantityInStock < 0) {
      throw new BadRequestError('A quantidade em estoque não pode ser menor ou igual a 0');
    }

    if(data.costPrice < 0) {
      throw new BadRequestError('O preço de custo não pode ser menor ou igual a 0');
    }

    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Produto não encontrado');
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

    const updatedData = {
      ...product,
      ...data,
      photo: data.photo || product.photo,
      barCode: product.barCode,
      numberOfTracks,
      tracks,
      price: salePrice
    }

    // reseta as musicas
    await this.trackRepository.deleteAll(product.id);

    const updatedProduct = await this.productRepository.update(updatedData);

    return updatedProduct;
  }
}

export { UpdateProductService };
