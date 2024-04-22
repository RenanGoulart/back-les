import { ExchangeStatus } from "@prisma/client";

class OrderItem {
  id!: string;
  quantity!: number;
  status!: ExchangeStatus | null;
  productId!: string;
  orderId!: string;
}

export { OrderItem }
