import { ICreateOrderItemDTO, IUpdateOrderItemStatusDTO } from "../dto/OrderItemDTO";
import { OrderItem } from "../entities/OrderItem";

interface IOrderItemRepository {
  create(orderItem: ICreateOrderItemDTO): Promise<OrderItem>;
  update(orderItem: OrderItem): Promise<OrderItem>;
  findById(id: string): Promise<OrderItem | null>;
}

export { IOrderItemRepository };
