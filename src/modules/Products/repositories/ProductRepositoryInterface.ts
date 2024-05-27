import { ICreateProductRepositoryDTO, IFindByAlbumAndArtist, IUpdateProductRepositoryDTO, IUpdateProductStatusDTO } from "../dto/ProductDTO";
import { Product } from "../entities/Product";

interface IProductRepository {
  create(product: ICreateProductRepositoryDTO): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findByIds(ids: string[]): Promise<Product[]>;
  findByNames(names: IFindByAlbumAndArtist): Promise<Product | null>;
  getAll(): Promise<Product[] | undefined>;
  update(product: IUpdateProductRepositoryDTO): Promise<Product>;
  updateReserveInStock(id: string): Promise<void>;
  updateInStock(product: IUpdateProductRepositoryDTO): Promise<Product>;
  updateStatus(product: IUpdateProductStatusDTO): Promise<Product>;
  delete(product: Product): Promise<void>;
}

export { IProductRepository };
