import { ExchangeStatus } from "@prisma/client";

interface ICreateOrderItemDTO{
  quantity: number;
  productId: string;
  orderId: string;
  status?: ExchangeStatus | null;
}

interface IUpdateOrderItemStatusDTO{
  itemId: string;
  status: ExchangeStatus;
}

interface IUpdateOrderItemExchangeStatusDTO  {
  itemId: string;
  orderId: string;
  quantity: number;
  status: string;
}

export { ICreateOrderItemDTO, IUpdateOrderItemStatusDTO, IUpdateOrderItemExchangeStatusDTO }
