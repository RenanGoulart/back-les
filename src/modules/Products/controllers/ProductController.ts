import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateProductService } from "../services/CreateProductService";
import { ListProductService } from "../services/ListProductService";
import { UpdateProductService } from "../services/UpdateProductService";
import { FindProductService } from "../services/FindProductService";
import { DeleteProductService } from "../services/DeleteProductService";

class ProductController {
  async create(request: Request, response: Response) {
    const { artist, album, year, producer, height, width, weight, pricingGroup, categories, quantityInStock, price, tracks } = request.body;

    const photo = request.file?.filename as string;

    const createProductService = container.resolve(CreateProductService);

    const product = await createProductService.execute({
      artist,
      album,
      year,
      producer,
      height,
      width,
      weight,
      pricingGroup,
      categories,
      quantityInStock: Number(quantityInStock),
      price: Number(price),
      photo,
      tracks,
    });

    return response.status(201).json(product);
  }

  async list(request: Request, response: Response) {
    const listProductService = container.resolve(ListProductService);

    const productsList = await listProductService.execute();

    return response.status(200).json(productsList);
  }

  async update(request: Request, response: Response) {
    const { artist, album, year, producer, numberOfTracks, height, width, weight, pricingGroup, categories, barCode, quantityInStock, price, photo } = request.body;

    const { id } = request.params;

    const updateProductService = container.resolve(UpdateProductService);

    const product = await updateProductService.execute(id, {
      artist,
      album,
      year,
      producer,
      numberOfTracks,
      height,
      width,
      weight,
      pricingGroup,
      categories,
      barCode,
      quantityInStock: Number(quantityInStock),
      price: Number(price),
      photo,
      id,
    });
    return response.status(201).json(product);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const findProductService = container.resolve(FindProductService);

    const product = await findProductService.execute(id);

    return response.status(200).json(product);
  }

  async delete(request: Request, response: Response){
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute(id);

    return response.status(204).send();
  }
}

export { ProductController };
