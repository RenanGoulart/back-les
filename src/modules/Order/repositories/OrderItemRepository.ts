import { prisma } from "@shared/database";
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
    return orderItem;
  }

  async update(orderItem: OrderItem): Promise<OrderItem> {
    const updatedOrder = await prisma.orderItem.update({
      where: { id: orderItem.id },
      data:{
        status: orderItem.status,
      },
    })
    return updatedOrder;

  }
}

export { OrderItemRepository }
