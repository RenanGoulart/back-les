import { OrderStatus } from "@prisma/client";
import { prisma } from "../../../shared/database";
import { ICreateOrderDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";
import { IOrderRepository } from "./OrderRepositoryInterface";

class OrderRepository implements IOrderRepository {
  async create({ code, status, freight, creditsUsed, addressId, cartId, couponId, userId, total, cards } : ICreateOrderDTO): Promise<Order> {
    const order = await prisma.order.create({
      data:{
        code,
        status: status as OrderStatus,
        freight,
        creditsUsed,
        addressId,
        cartId,
        couponId: couponId || '',
        userId,
        total,
        cards: { create: cards },
      }
    })
    return { ...order, orderItems: [], cards: [] };
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { orderItems: true, cards: true }
    });
    return order;
  }

  async findByUserId(userId: string): Promise<Order | null> {
    const order  = await prisma.order.findFirst({
      where: { userId },
      include: { orderItems: true, cards: true }
    });
    return order as Order;
  }

  async getAll(): Promise<Order[] | undefined> {
    const orders = await prisma.order.findMany();

    return orders.map(orderData => ({
      ...orderData,
      orderItems: [],
      cards: [],
    }))
  }

  async update(order: Order): Promise<Order> {
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data:{
        status: order.status,
      },
      include: { orderItems: true, cards: true }
    })
    return updatedOrder as Order;

  }
  async delete(orderId: string): Promise<void> {
    await prisma.order.delete({
      where: { id: orderId },
    })
  }

}

export { OrderRepository }
