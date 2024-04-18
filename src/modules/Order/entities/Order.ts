import { OrderStatus } from "@prisma/client";
import { OrderItem } from "./OrderItem";
import { OrderCard } from "./OrderCard";

class Order {
  id!: string;
  code!: string;
  status!: OrderStatus;
  freight!: number;
  total!: number;
  creditsUsed!: number;
  addressId!: string;
  cartId!: string;
  couponId!: string;
  userId!: string;
  orderItems!: OrderItem[];
  cards!: OrderCard[];
}

export { Order }
