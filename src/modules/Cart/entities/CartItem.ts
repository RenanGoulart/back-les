import { Product } from "@prisma/client";

class CartItem {
  id: string;
  quantity!: number;
  salePrice!: number;
  productId!: string;
  cartId!: string;
  product!: Product;
}

export { CartItem };
