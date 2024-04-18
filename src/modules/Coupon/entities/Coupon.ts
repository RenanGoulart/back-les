import { Order } from "@prisma/client";

class Coupon {
  id!: string;
  name!: string;
  value!: number;
  quantity!: number;
  expirationDate!: Date;
  orders?: Order[];
}

export { Coupon }
