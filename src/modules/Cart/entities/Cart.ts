import { CartItem } from "@prisma/client";

class Cart {
  id!: string;
  total!: number;
  userId!: string;
  cartItems!: CartItem[];
}

export { Cart };
