import { prisma } from "../../../shared/database";
import { PricingGroup, Category } from "@prisma/client";
import { Product } from "../entities/Product";
import { IProductRepository } from "./ProductRepositoryInterface";
import { ICreateProductRepositoryDTO, IFindByAlbumAndArtist, IUpdateProductRepositoryDTO } from "../dto/ProductDTO";

class ProductRepository implements IProductRepository {
  async create({ artist, album, year, producer, numberOfTracks, height, width, weight, pricingGroup, categories, barCode, quantityInStock, costPrice, price, photo, tracks }: ICreateProductRepositoryDTO): Promise<Product> {
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
        quantityInStock,
        costPrice,
        price,
        photo,
        tracks: { create: tracks }
      },
    });
    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { tracks: true }
    });
    return product;
  }
  async getAll(): Promise<Product[]| undefined> {
    const products = await prisma.product.findMany();
    return products;
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    const productsIds = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return productsIds;
  }

  async findByNames({ album, artist }: IFindByAlbumAndArtist): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        AND: [
          {
            album: {
              equals: album,
              mode: "insensitive",
            },
          },
          {
            artist: {
              equals: artist,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return product;
  }


  async update({ id, artist, album, year, producer, numberOfTracks, height, width, weight, pricingGroup, categories, barCode, quantityInStock, costPrice, price, photo, tracks }: IUpdateProductRepositoryDTO): Promise<Product> {
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
        quantityInStock,
        costPrice,
        price,
        photo,
        tracks: {
          createMany: {
            data: tracks,
            skipDuplicates: true,
          }
        }
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
