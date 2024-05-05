import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { Order } from "../entities/Order";

@injectable()
class ListOrderService {
  constructor(
    @inject('OrderRepository')
    private OrderRepository: IOrderRepository
  ) {}

  async execute(): Promise<Order[] | undefined> {
    const orders = await this.OrderRepository.getAll();
    return orders;
  }
}

export { ListOrderService };
