import { OrderStatus } from "@prisma/client";
import { OrderCard } from "../entities/OrderCard";

interface ICreateOrderDTO {
  addressId: string;
  cartId: string;
  freight: number;
  creditsUsed: number;
  couponId: string | null;
  userId: string;
  code: string;
  status: OrderStatus;
  total: number;
  cards: OrderCard[];
}

interface IUpdateOrderStatusDTO {
  id: string;
  status: OrderStatus;
}

export { ICreateOrderDTO, IUpdateOrderStatusDTO }
