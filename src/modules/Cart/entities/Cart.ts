import { CartItem } from "./CartItem";

class Cart {
  id!: string;
  total!: number;
  userId!: string;
  cartItems!: CartItem[];
}

export { Cart };
