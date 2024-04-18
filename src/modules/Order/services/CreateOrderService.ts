import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { IOrderItemRepository } from "../repositories/OrderItemRepositoryInterface";
import { IOrderCardRepository } from "../repositories/OrderCardRepositoryInterface";
import { ICreateOrderDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('OrderItemRepository')
    private orderItemRepository: IOrderItemRepository,
    @inject('OrderCardRepository')
    private orderCardRepository: IOrderCardRepository
  ) {}

  async execute(data: ICreateOrderDTO): Promise<Order> {

  }
}

export { CreateOrderService }
