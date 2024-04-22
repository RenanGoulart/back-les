import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { Order } from "../entities/Order";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class FindOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) {}

  async execute(id: string): Promise<Order[] | null> {
    const orders = await this.orderRepository.findByUserId(id);

    if (!orders) {
      throw new NotFoundError('Pedidos não encontrados!');
    }

    return orders;
  }
}

export { FindOrderService };
