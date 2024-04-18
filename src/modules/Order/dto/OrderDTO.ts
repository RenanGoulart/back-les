import { OrderStatus } from "@prisma/client";

interface ICreateOrderDTO {
  freight: number;
  creditsUsed: number;
  addressId: string;
  cartId: string;
  couponId: string;
}

interface IUpdateOrderDTO {
  id: string;
  status: OrderStatus;
}

export { ICreateOrderDTO, IUpdateOrderDTO }
