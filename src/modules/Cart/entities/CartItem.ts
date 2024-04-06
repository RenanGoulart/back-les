import { Product } from "@prisma/client";

class CartItem {
  id!: string;
  quantity!: string;
  product!: Product;
}

export { CartItem };
