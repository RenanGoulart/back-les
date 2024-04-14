import { prisma } from "../../../shared/database";
import { PricingGroup, Category } from "@prisma/client";
import { Product } from "../entities/Product";
import { IProductRepository } from "./ProductRepositoryInterface";
import { ICreateProductDTO } from "../dto/CreateProductDTO";
import { IUpdateProductDTO } from "../dto/UpdateProductDTO";

class ProductRepository implements IProductRepository {
  async create({artist, album, year, producer, numberOfTracks, height, width, weight, pricingGroup, categories, barCode, price, photo}: ICreateProductDTO): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        artist,
        album,
        year,
        producer,
        numberOfTracks,
        height,
        width,
        weight,
        pricingGroup: pricingGroup as PricingGroup,
        categories: categories as Category[],
        barCode,
        price,
        photo,
      },
    });
    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  }

  async getAll(): Promise<Product[]| undefined> {
    const products = await prisma.product.findMany();
    return products;
  }

  async update({id, artist, album, year, producer, numberOfTracks, height, width, weight, pricingGroup, categories, barCode, price, photo}: IUpdateProductDTO): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        artist,
        album,
        year,
        producer,
        numberOfTracks,
        height,
        width,
        weight,
        pricingGroup: pricingGroup as PricingGroup,
        categories: categories as Category[],
        barCode,
        price,
        photo,
      },
    });
    return updatedProduct;
  }

  async delete(product: Product): Promise<void> {
    await prisma.product.delete({
      where: { id: product.id },
    });
  }
}

export { ProductRepository };
