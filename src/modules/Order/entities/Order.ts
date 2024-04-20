import { OrderStatus } from "@prisma/client";
import { OrderItem } from "./OrderItem";
import { OrderCard } from "./OrderCard";

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
