import { inject, injectable } from "tsyringe";
import { NotFoundError } from "../../../shared/helpers/apiErrors";
import { generateCuriosity } from "../../../shared/providers/openai";
import { IProductRepository } from "../repositories/ProductRepositoryInterface";
import { IChatDTO } from "../dto/ProductDTO";

@injectable()
class ChatService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({id, message}: IChatDTO): Promise<string | null> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Produto não encontrado');
    }

    const chatResponse = await generateCuriosity(product.album, product.artist, message);

    if (!chatResponse) {
      throw new NotFoundError('Curiosidade não encontrada');
    }

    const formattedCuriosity = chatResponse.replace(/(\\")/g, '');
    return formattedCuriosity;
  }
}

export { ChatService };
