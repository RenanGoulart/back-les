import { prisma } from "../../../shared/database";
import { ICreateOrderCardDTO } from "../dto/OrderCardDTO";
import { OrderCard } from "../entities/OrderCard";
import { IOrderCardRepository } from "./OrderCardRepositoryInterface";

class orderCardRepository implements IOrderCardRepository{
  async create({ value,  orderId, cardId } : ICreateOrderCardDTO): Promise<OrderCard> {
    const orderCard = await prisma.orderCard.create({
      data: {
        value,
        orderId,
        cardId
      }
    });
    return orderCard;
  }
  async findMany(ids: string[]): Promise<OrderCard[]> {
      throw new Error("Method not implemented.");
  }
}

export { orderCardRepository }
