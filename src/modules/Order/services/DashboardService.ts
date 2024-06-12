import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { IDashboardOrderDTO, IGroupedItemDTO, IResult } from "../dto/OrderDashboardDTO";
import { DashboardData } from "../entities/DashboardData";

@injectable()
class DashboardService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  async execute({ startDate, endDate, productFilters }: IDashboardOrderDTO): Promise<IResult | null> {
    const { start, end } = this.getStartEndDates(startDate, endDate);

    const data = await this.orderRepository.getAllDashboard(start, end, productFilters);

    if (!data) {
      return null;
    }

    const groupedData = data.reduce((acc: Record<string, IGroupedItemDTO>, item: DashboardData) => {
      const { month, year } = this.getMonthYear(item.date);
      const key = `${item.productName}-${month}-${year}`;

      if (!acc[key]) {
        acc[key] = {
          productName: item.productName,
          date: `${month < 10 ? `0${month}` : month}/${year}`,
          total: 0,
        };
      }

      acc[key].total += item.amount;
      return acc;
    }, {});

    const filledResult = this.fillMissingLabels(Object.values(groupedData));

    return this.formatData(filledResult) as IResult;
  }

  formatData(data: IGroupedItemDTO[]) {
    const labels = Array.from(new Set(data.map(item => item.date)));
    const datasets = Array.from(new Set(data.map(item => item.productName))).map(label => {
      const values = data.filter(item => item.productName === label).map(item => item.total);
      return { label, values };
    });

    return { labels, datasets };
  }

  fillMissingLabels(products: IGroupedItemDTO[]) {
    const allLabels = Array.from(new Set(products.map(product => product.date)))
    const allProductNames = Array.from(new Set(products.map(product => product.productName)));

    const result: IGroupedItemDTO[] = [];
    allProductNames.forEach(productName => {
      allLabels.forEach(date => {
        const existingProduct = products.find(product => product.productName === productName && product.date === date);
        if (existingProduct) {
          result.push(existingProduct);
        } else {
          result.push({ productName, date, total: 0 });
        }
      });
    });

    result.sort((a, b) => {
      const [monthA, yearA] = a.date.split('/').map(Number);
      const [monthB, yearB] = b.date.split('/').map(Number);
      return yearA - yearB || monthA - monthB;
    });

    return result;
  }

  getMonthYear(dateString: Date) {
    const date = new Date(dateString);
    return {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }

  getStartEndDates(startDate: Date, endDate: Date): { start: Date, end: Date } {
    const isoStartDate = new Date(startDate);
    const isoEndDate = new Date(endDate);

    const start = new Date(isoStartDate.getFullYear(), isoStartDate.getMonth(), isoStartDate.getDate());
    start.setHours(start.getHours() + 21);

    const end = new Date(isoEndDate.getFullYear(), isoEndDate.getMonth(), isoEndDate.getDate());
    end.setHours(end.getHours() + 45);

    return { start, end };
  }
}

export { DashboardService }
