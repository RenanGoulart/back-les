import { OrderStatus } from "@prisma/client";
import { OrderCard } from "../entities/OrderCard";

interface ICreateOrderDTO {
  addressId: string;
  cartId: string;
  couponId: string | null;
  freight: number;
  cards: OrderCard[];
  creditsUsed: number;
}

interface ICreateOrderRepositoryDTO {
  code: string;
  status: OrderStatus;
  freight: number;
  creditsUsed: number;
  addressId: string;
  couponId: string | null;
  userId: string;
  total: number;
  cards: OrderCard[];
}

interface IUpdateOrderStatusDTO {
  id: string;
  status: OrderStatus;
}

export { ICreateOrderDTO, ICreateOrderRepositoryDTO, IUpdateOrderStatusDTO }
