import { container } from "tsyringe";
import { CreateOrderService } from "../services/CreateOrderService";
import { Request, Response } from "express";
import { UpdateOrderService } from "../services/UpdateOrderService";

class OrderController{
  async create(request: Request, response: Response) {
    const { addressId, cartId, couponId, freight, cards, creditsUsed } = request.body;

    const createOrderService = container.resolve(CreateOrderService);

    const order = await createOrderService.execute({ addressId, cartId, couponId, freight, cards, creditsUsed });

    return response.status(201).json(order);
  }

  async update(request: Request, response: Response) {
    const { status } = request.body;
    const { id } = request.params;

    const updateOrderService = container.resolve(UpdateOrderService);

    const order = await updateOrderService.execute({ id, status });

    return response.status(201).json(order);
  }
}

export { OrderController };
