import { OrderCard, OrderItem, OrderStatus } from "@prisma/client";

class Order {
  id!: string;
  userId!: string;
  orderItems!: OrderItem[];
  cards!: OrderCard[];
  couponId!: string;
  code!: string;
  creditsUsed!: number;
  status!: OrderStatus;
  freight!: number;
  total!: number;
  addressId!: string;
}

export { Order }
