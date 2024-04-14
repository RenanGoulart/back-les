import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateCartService } from "../services/CreateCartService";
import { FindCartService } from "../services/FindCartService";
import { AddFromCartService } from "../services/AddFromCartService";
import { SubtractFromCartService } from "../services/SubtractFromCartService";
import { RemoveFromCartService } from "../services/RemoveFromCartService";

class CartController {
  async create(request: Request, response: Response) {
    const { userId, productId } = request.body;

    const createCartService = container.resolve(CreateCartService);

    const cart = await createCartService.execute({
      userId,
      productId,
    });

    return response.status(201).json(cart);
  }

  async findByUserId(request: Request, response: Response) {
    const { id } = request.params;

    const findCartService = container.resolve(FindCartService);

    const cart = await findCartService.execute(id);

    return response.status(200).json(cart);
  }

  async updateAddItem(request: Request, response: Response) {
    const { id } = request.params;
    const { productId } = request.body;

    const addFromCartService = container.resolve(AddFromCartService);

    const cart = await addFromCartService.execute({ cartId: id, productId});
    return response.status(200).json(cart);
  }

  async updateSubtractItem(request: Request, response: Response) {
    const { id } = request.params;
    const { productId } = request.body;

    const subtractFromCartService = container.resolve(SubtractFromCartService);

    const cart = await subtractFromCartService.execute({ cartId: id, productId});
    return response.status(200).json(cart);
  }

  async updateRemoveItem(request: Request, response: Response) {
    const { id } = request.params;
    const { productId } = request.body;

    const removeFromCartService = container.resolve(RemoveFromCartService);

    const cart = await removeFromCartService.execute({ cartId: id, productId});
    return response.status(200).json(cart);
  }
}

export { CartController };
