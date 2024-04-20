import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { IUpdateOrderStatusDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";
import { NotFoundError } from "@shared/helpers/apiErrors";

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ id, status }: IUpdateOrderStatusDTO): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundError('Pedido não encontrado!');
    }

    order.status = status;

    await this.orderRepository.update(order);

    return order;
  }
}
export { UpdateOrderService };
