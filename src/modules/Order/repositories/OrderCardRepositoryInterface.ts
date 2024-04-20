import { ICreateOrderCardDTO } from "../dto/OrderCardDTO";
import { OrderCard } from "../entities/OrderCard";

interface IOrderCardRepository {
  create(orderItem: ICreateOrderCardDTO): Promise<OrderCard>;
  findMany(ids: string[]): Promise<OrderCard[]>;
}

export { IOrderCardRepository };
