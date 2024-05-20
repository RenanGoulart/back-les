import { inject, injectable } from "tsyringe";
import { NotFoundError } from "../../../shared/helpers/apiErrors";
import { IOrderItemRepository } from "../repositories/OrderItemRepositoryInterface";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { Order } from "../entities/Order";
import { ExchangeStatus, OrderStatus } from "@prisma/client";
import { IUpdateOrderStatusDTO } from "../dto/OrderDTO";

@injectable()
class RequestOrderExchangeService {
  constructor(
    @inject('OrderItemRepository')
    private orderItemRepository: IOrderItemRepository,
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ id, status }: IUpdateOrderStatusDTO): Promise<Order | undefined> {
      const order = await this.orderRepository.findById(id);

      if (!order) {
        throw new NotFoundError('Pedido não encontrado!');
      }

      // Atualiza o status de todos os itens do pedido
      await Promise.all(order.orderItems.map(async (orderItem) => {
        orderItem.status = status as ExchangeStatus;
        await this.orderItemRepository.update(orderItem);
      }));

      // Atualiza o status do pedido
      order.status = status as OrderStatus;

      await this.orderRepository.update(order);

      return order;
    }

}

export { RequestOrderExchangeService };
