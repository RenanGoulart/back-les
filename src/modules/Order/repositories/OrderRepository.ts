import { OrderStatus } from "@prisma/client";
import { prisma } from "../../../shared/database";
import { ICreateOrderRepositoryDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";
import { IOrderRepository } from "./OrderRepositoryInterface";
import { DashboardData } from "../entities/DashboardData";

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
      orderBy: [{
        createdAt: 'desc',
      }],
      include: { orderItems: { include: { product: true }}, cards: { include: { card: true } }, address: true }
    });
    return order as Order[];
  }

  async getAll(): Promise<Order[] | undefined> {
    const orders = await prisma.order.findMany({
      orderBy: [{
        createdAt: 'desc',
      }],
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

  async getAllDashboard(startDate: Date, endDate: Date, productFilters: string[]): Promise<DashboardData[] | null> {
    const filters: any = {
      Order: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        status: {
          in: [
            OrderStatus.APROVADA,
            OrderStatus.EM_TRANSITO,
            OrderStatus.ENTREGUE,
            OrderStatus.TROCA_SOLICITADA,
            OrderStatus.TROCA_AUTORIZADA,
          ],
        },
      },
    };

    if (productFilters && productFilters.length > 0) {
      filters.productId = { in: productFilters };
    }

    const dashboardData = await prisma.orderItem.findMany({
      where: filters,
      orderBy: {
        Order: {
          createdAt: 'asc',
        },
      },
      include: { product: true, Order: true },
    });

    const formattedData = dashboardData.map(orderItem => ({
      date: orderItem.Order.createdAt,
      amount: orderItem.salePrice,
      productName: orderItem.product.album,
    }));

    return formattedData as DashboardData[];
  }
}

export { OrderRepository }
