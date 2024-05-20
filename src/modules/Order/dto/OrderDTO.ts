import { ExchangeStatus, OrderCard, OrderItem, OrderStatus } from "@prisma/client";

interface ICreateOrderDTO {
  addressId: string;
  cartId: string;
  couponId: string | null;
  freight: number;
  cards: { id: string, value: number }[];
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
  orderItems: OrderItem[];
}

interface IUpdateOrderStatusDTO {
  id: string;
  status: OrderStatus;
}


export { ICreateOrderDTO, ICreateOrderRepositoryDTO, IUpdateOrderStatusDTO }
