import { inject, injectable } from "tsyringe";
import { NotFoundError } from "../../../shared/helpers/apiErrors";
import { IOrderItemRepository } from "../repositories/OrderItemRepositoryInterface";
import { IUpdateOrderItemStatusDTO } from "../dto/OrderItemDTO";
import { OrderItem } from "../entities/OrderItem";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { Order } from "../entities/Order";
import { IUpdateOrderStatusDTO } from "../dto/OrderDTO";

@injectable()
class ExchangeRequestService {
  constructor(
    @inject('OrderItemRepository')
    private orderItemRepository: IOrderItemRepository,
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ id }: IUpdateOrderItemStatusDTO | IUpdateOrderStatusDTO): Promise<Order | OrderItem | undefined> {
    const orderItem = await this.orderItemRepository.findById(id);
    const order = await this.orderRepository.findById(id);

    if (!orderItem && !order) {
      throw new NotFoundError('Item do pedido/pedido não encontrado!');
    }

    if(orderItem){
      orderItem.status = "TROCA_SOLICITADA";

      await this.orderItemRepository.update(orderItem);

      return orderItem;
    } else if (order){
      order.status = "TROCA_SOLICITADA";

      await Promise.all(order.orderItems.map(async (orderItem) => {
        orderItem.status = "TROCA_SOLICITADA";
        await this.orderItemRepository.update(orderItem);
      }));

      await this.orderRepository.update(order);

      return order;
    }
  }
}
export { ExchangeRequestService };
