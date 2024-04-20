import { ICreateOrderItemDTO, IUpdateOrderItemStatusDTO } from "../dto/OrderItemDTO";
import { OrderItem } from "../entities/OrderItem";

interface IOrderItemRepository {
  create(orderItem: ICreateOrderItemDTO): Promise<OrderItem>;
  update(orderItem: IUpdateOrderItemStatusDTO): Promise<OrderItem>;
}

export { IOrderItemRepository };
