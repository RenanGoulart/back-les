import { prisma } from "../../../shared/database";
import { ICreateOrderItemDTO } from "../dto/OrderItemDTO";
import { OrderItem } from "../entities/OrderItem";
import { IOrderItemRepository } from "./OrderItemRepositoryInterface";
import { ExchangeStatus } from "@prisma/client";

class OrderItemRepository implements IOrderItemRepository{
  async create({ quantity, status, productId, orderId }: ICreateOrderItemDTO): Promise<OrderItem> {
    const orderItem = await prisma.orderItem.create({
      data: {
        quantity,
        status: status as ExchangeStatus,
        productId,
        orderId
      }
    });
    return orderItem as OrderItem;
  }

  async update(orderItem: OrderItem): Promise<OrderItem> {
    const updatedOrder = await prisma.orderItem.update({
      where: { id: orderItem.id },
      data:{
        status: orderItem.status,
      },
    })
    return updatedOrder as OrderItem;
  }

  async findById(id: string): Promise<OrderItem | null> {
    const orderItem = await prisma.orderItem.findUnique({
      where: { id },
    });
    return orderItem as OrderItem;
  }
}

export { OrderItemRepository }
