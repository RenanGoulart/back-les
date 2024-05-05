import { container } from "tsyringe";
import { CreateOrderService } from "../services/CreateOrderService";
import { Request, Response } from "express";
import { UpdateOrderService } from "../services/UpdateOrderService";
import { ListOrderService } from "../services/ListOrderService";
import { FindOrderService } from "../services/FindOrderByUserService";
import { UpdateOrderItemService } from "../services/UpdateOrderItemService";
import { ExchangeRequestService } from "../services/ExchangeRequestService";

class OrderController{
  async create(request: Request, response: Response) {
    const { addressId, cartId, couponId, freight, cards, creditsUsed } = request.body;

    const createOrderService = container.resolve(CreateOrderService);

    const order = await createOrderService.execute({ addressId, cartId, couponId, freight, cards, creditsUsed });

    return response.status(201).json(order);
  }

  async updateOrder(request: Request, response: Response) {
    const { status } = request.body;
    const { id } = request.params;

    const updateOrderService = container.resolve(UpdateOrderService);

    const order = await updateOrderService.execute({ id, status });

    return response.status(200).json(order);
  }

  async updateOrderItem(request: Request, response: Response) {
    const { status } = request.body;
    const { id } = request.params;

    const updateOrderItemService = container.resolve(UpdateOrderItemService);

    const orderItem = await updateOrderItemService.execute({ id, status });

    return response.status(201).json(orderItem);
  }

  async list(request: Request, response: Response) {
    const listOrderService = container.resolve(ListOrderService);

    const ordersList = await listOrderService.execute();

    return response.status(200).json(ordersList);
  }

  async findByUserId(request: Request, response: Response) {
    const { id } = request.params;

    const findOrderService = container.resolve(FindOrderService);

    const ordersList = await findOrderService.execute(id);

    return response.status(200).json(ordersList);
  }

  async exchangeRequest(request: Request, response: Response) {
    const { id } = request.params;
    const { status } = request.body;

    const exchangeRequestService = container.resolve(ExchangeRequestService);

    const order = await exchangeRequestService.execute({ id, status });

    return response.status(200).json(order);
  }
}

export { OrderController };
