import { inject, injectable } from "tsyringe";
import { NotFoundError } from "../../../shared/helpers/apiErrors";
import { IOrderItemRepository } from "../repositories/OrderItemRepositoryInterface";
import { IUpdateOrderItemStatusDTO } from "../dto/OrderItemDTO";
import { OrderItem } from "../entities/OrderItem";

@injectable()
class UpdateOrderItemService {
  constructor(
    @inject('OrderItemRepository')
    private orderItemRepository: IOrderItemRepository,
  ) {}

  public async execute({ id, status }: IUpdateOrderItemStatusDTO): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findById(id);

    if (!orderItem) {
      throw new NotFoundError('Item do pedido não encontrado!');
    }

    orderItem.status = status;

    await this.orderItemRepository.update(orderItem);

    return orderItem;
  }
}
export { UpdateOrderItemService };
