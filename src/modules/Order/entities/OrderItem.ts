import { ExchangeStatus } from "@prisma/client";

class OrderItem{
  id!: string;
  quantity!: number;
  status!: ExchangeStatus;
  productId!: string;
  orderId!: string;
}

export { OrderItem }
