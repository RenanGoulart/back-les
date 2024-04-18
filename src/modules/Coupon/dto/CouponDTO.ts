import { Order } from "@prisma/client";

interface ICreateCouponDTO {
  name: string;
  value: number;
  quantity: number;
  expirationDate: Date;
  orders: Order[];
}

interface IUpdateCouponDTO {
  id: string;
  name:string;
  value: number;
  quantity: number;
  expirationDate: Date;
  orders: Order[];
}

interface IDeleteCouponDTO {
  id: string;
}

export { ICreateCouponDTO, IUpdateCouponDTO, IDeleteCouponDTO }
