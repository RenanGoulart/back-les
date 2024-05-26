import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateProductService } from "../services/CreateProductService";
import { ListProductService } from "../services/ListProductService";
import { UpdateProductService } from "../services/UpdateProductService";
import { FindProductService } from "../services/FindProductService";
import { DeleteProductService } from "../services/DeleteProductService";
import { UpdateProductInStockService } from "../services/UpdateProductInStockService";
import {  UpdateProductStatusService } from "../services/UpdateProductStatusService";

class ProductController {
  async create(request: Request, response: Response) {
    const { artist, album, year, producer, height, width, weight, pricingGroup, categories, quantityInStock, costPrice, tracks } = request.body;

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
      costPrice: Number(costPrice),
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
    const { artist, album, year, producer, numberOfTracks, height, width, weight, pricingGroup, categories, barCode, quantityInStock, costPrice, tracks } = request.body;

    const { id } = request.params;

    const photo = request.file?.filename as string;

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
      costPrice: Number(costPrice),
      photo,
      tracks,
      id,
    });
    return response.status(200).json(product);
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

  async updateInStock(request: Request, response: Response): Promise<Response> {
    const { quantityInStock, costPrice } = request.body;
    const { id } = request.params;

    const updateProductInStockService = container.resolve(UpdateProductInStockService);

    const product = await updateProductInStockService.execute({
      id,
      quantityInStock: Number(quantityInStock),
      costPrice: Number(costPrice),
    });

    return response.status(200).json(product);
  }

  async updateStatus(request: Request, response: Response): Promise<Response> {
    const { status, statusReason } = request.body;
    const { id } = request.params;

    const updateProductStatusService = container.resolve(UpdateProductStatusService);

    const product = await updateProductStatusService.execute({
      id,
      status,
      statusReason,
    });

    return response.status(200).json(product);
  }

}

export { ProductController };
