import { Product } from '../../Products/entities/Product';

class CartItem {
  id: string;
  quantity!: number;
  salePrice!: number;
  productId!: string;
  cartId!: string;
}

export { CartItem };
