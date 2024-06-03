import { OrderStatus } from "@prisma/client";

class OrderDashboard {
  id!: string;
  userId!: string;
  couponId!: string;
  code!: string;
  creditsUsed!: number;
  status!: OrderStatus;
  freight!: number;
  total!: number;
  addressId!: string;
}

export { OrderDashboard }
