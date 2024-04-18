import { ICreateOrderItemDTO, IUpdateOrderItemDTO } from "../dto/OrderItemDTO";
import { OrderItem } from "../entities/OrderItem";

interface IOrderItemRepository {
  create(orderItem: ICreateOrderItemDTO): Promise<OrderItem>;
  update(orderItem: IUpdateOrderItemDTO): Promise<OrderItem>;
}

export { IOrderItemRepository };
