import { ICreateProductDTO } from "../dto/ProductDTO";
import { Product } from "../entities/Product";

interface IProductRepository {
  create(product: ICreateProductDTO): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  getAll(): Promise<Product[] | undefined>;
  update(product: Product): Promise<Product>;
  delete(product: Product): Promise<void>;
}

export { IProductRepository };
