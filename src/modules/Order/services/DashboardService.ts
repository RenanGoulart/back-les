import { inject, injectable } from "tsyringe";
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

    const start = new Date(isoStartDate.getFullYear(), isoStartDate.getMonth(), isoStartDate.getDate());
    start.setHours(start.getHours() + 21);

    const end = new Date(isoEndDate.getFullYear(), isoEndDate.getMonth(), isoEndDate.getDate());
    end.setHours(end.getHours() + 45);

    console.log('start e and', start, end)

    const orders = await this.orderRepository.getAllDashboard(start, end);
    return orders;
  }

}

export { DashboardService }
