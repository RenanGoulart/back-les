import { ExchangeStatus } from "@prisma/client";

interface ICreateOrderItemDTO{
  quantity: number;
  productId: string;
  orderId: string;
}

interface IUpdateOrderItemDTO{
  id: string;
  quantity: number;
  productId: string;
  orderId: string;
}

export { ICreateOrderItemDTO, IUpdateOrderItemDTO }
