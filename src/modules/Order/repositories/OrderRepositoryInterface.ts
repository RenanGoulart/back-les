import { ICreateOrderRepositoryDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";
import { OrderDashboard } from "../entities/OrderDashboard";

interface IOrderRepository {
  create(order: ICreateOrderRepositoryDTO): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[] | null>;
  getAll(): Promise<Order[] | undefined>;
  getAllDashboard(startDate: Date, endDate: Date): Promise<OrderDashboard[] | null>;
  update(order: Order): Promise<Order>;
  delete(orderId: string): Promise<void>;
}

export { IOrderRepository };
