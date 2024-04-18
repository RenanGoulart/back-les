import { ICreateOrderDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";

interface IOrderRepository {
  create(order: ICreateOrderDTO): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order | null>;
  getAll(): Promise<Order[] | undefined>;
  update(order: Order): Promise<Order>;
  delete(orderId: string): Promise<void>;
}

export { IOrderRepository };
