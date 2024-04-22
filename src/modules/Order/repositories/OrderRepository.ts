import { OrderStatus } from "@prisma/client";
import { prisma } from "../../../shared/database";
import { ICreateOrderRepositoryDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";
import { IOrderRepository } from "./OrderRepositoryInterface";

class OrderRepository implements IOrderRepository {
  async create({ code, status, freight, creditsUsed, addressId, couponId, userId, total, cards, orderItems }: ICreateOrderRepositoryDTO): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        code,
        status: status as OrderStatus,
        freight,
        creditsUsed,
        address: { connect: { id: addressId } },
        user: { connect: { id: userId } },
        total,
        cards: { create: cards },
        orderItems: { create: orderItems },
        ...(couponId && { coupon: { connect: { id: couponId } } }),
      },
      include: { orderItems: { include: { product: true }}, cards: { include: { card: true } }, address: true }
    })

    return order as Order;
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { orderItems: true, cards: { include: { card: true } }, address: true }
    });
    return order as Order;
  }

  async findByUserId(userId: string): Promise<Order[] | null> {
    const order  = await prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { product: true }}, cards: { include: { card: true } }, address: true }
    });
    return order as Order[];
  }

  async getAll(): Promise<Order[] | undefined> {
    const orders = await prisma.order.findMany({
      include: { orderItems: { include: { product: true }}, cards: { include: { card: true } }, address: true }
    });

    return orders as Order[];
  }

  async update(order: Order): Promise<Order> {
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data:{
        status: order.status,
      },
      include: { orderItems: true, cards: { include: { card: true } }, address: true }
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
