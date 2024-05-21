import { container } from "tsyringe";
import { CreateOrderService } from "../services/CreateOrderService";
import { Request, Response } from "express";
import { UpdateOrderService } from "../services/UpdateOrderService";
import { ListOrderService } from "../services/ListOrderService";
import { FindOrderService } from "../services/FindOrderByUserService";
import { UpdateOrderItemService } from "../services/UpdateOrderItemService";
import { RequestOrderExchangeService } from "../services/RequestOrderExchangeService";
import { RequestOrderItemExchangeService } from "../services/RequestOrderItemExchangeService";

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

    const orderItem = await updateOrderItemService.execute({ itemId: id, status });

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

  async exchangeOrderRequest(request: Request, response: Response) {
    const { status } = request.body;
    const { id } = request.params;

    const exchangeRequestService = container.resolve(RequestOrderExchangeService);

    const order = await exchangeRequestService.execute({ id, status });
    return response.status(200).json(order);
  }

  async exchangeOrderItemRequest(request: Request, response: Response) {
    const { orderId, quantity, status } = request.body;
    const { id } = request.params;

    const exchangeRequestService = container.resolve(RequestOrderItemExchangeService);

    const orderItem = await exchangeRequestService.execute({ itemId: id, orderId, quantity, status });
    return response.status(200).json(orderItem);

  }
}

export { OrderController };
