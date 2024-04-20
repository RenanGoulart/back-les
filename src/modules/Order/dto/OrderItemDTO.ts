import { ExchangeStatus } from "@prisma/client";

interface ICreateOrderItemDTO{
  quantity: number;
  productId: string;
  orderId: string;
  status?: ExchangeStatus | null;
}

interface IUpdateOrderItemStatusDTO{
  id: string;
  status: ExchangeStatus;
}

export { ICreateOrderItemDTO, IUpdateOrderItemStatusDTO }
