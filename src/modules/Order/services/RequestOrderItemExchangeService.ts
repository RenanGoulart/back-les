import { inject, injectable } from "tsyringe";
import { BadRequestError, NotFoundError } from "../../../shared/helpers/apiErrors";
import { IOrderItemRepository } from "../repositories/OrderItemRepositoryInterface";
import { IUpdateOrderItemExchangeStatusDTO } from "../dto/OrderItemDTO";
import { OrderItem } from "../entities/OrderItem";
import { ExchangeStatus } from "@prisma/client";

@injectable()
class RequestOrderItemExchangeService {
  constructor(
    @inject('OrderItemRepository')
    private orderItemRepository: IOrderItemRepository,
  ) {}

  public async execute({ itemId, orderId, quantity, status }: IUpdateOrderItemExchangeStatusDTO): Promise<OrderItem | undefined> {
    const orderItem = await this.orderItemRepository.findById(itemId);

    if (!orderItem) {
      throw new NotFoundError('Item do pedido não encontrado!');
    }

    // Valida se a quantidade solicitada é válida
    if (orderItem.quantity < quantity) {
      throw new BadRequestError('Quantidade solicitada para troca é maior do que a quantidade comprada!');
    }

    orderItem.quantity -= quantity;
    await this.orderItemRepository.update(orderItem);

    const newOrderItem = new OrderItem();
    newOrderItem.status = status as ExchangeStatus;
    newOrderItem.quantity = quantity;
    newOrderItem.orderId = orderId;
    newOrderItem.productId = orderItem.productId;
    await this.orderItemRepository.create(newOrderItem);

    return newOrderItem;
  }
}

export { RequestOrderItemExchangeService };
