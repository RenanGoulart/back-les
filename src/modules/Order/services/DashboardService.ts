import { inject, injectable } from "tsyringe";
import { Order } from "../entities/Order";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { IDashboardOrderDTO } from "../dto/OrderDashboardDTO";
import { OrderDashboard } from "../entities/OrderDashboard";

@injectable()
class DashboardService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  async execute({ startDate, endDate }: IDashboardOrderDTO): Promise<OrderDashboard[] | null> {
    const isoStartDate = new Date(startDate);
    const isoEndDate = new Date(endDate);

    const start = new Date(isoStartDate.getUTCFullYear(), isoStartDate.getUTCMonth(), isoStartDate.getUTCDate());
    const end = new Date(isoEndDate.getUTCFullYear(), isoEndDate.getUTCMonth(), isoEndDate.getUTCDate());

    const orders = await this.orderRepository.getAllDashboard(start, end);
    return orders;
  }

}

export { DashboardService }
