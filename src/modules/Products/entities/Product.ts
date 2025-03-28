import { PricingGroup, Category } from "@prisma/client";

class Product {
  id!: string;
  artist!: string;
  album!: string;
  year!: string;
  producer!: string;
  numberOfTracks!: string;
  height!: string;
  width!: string;
  weight!: string;
  pricingGroup!: PricingGroup;
  categories!: Category[];
  barCode!: string;
  quantityInStock!: number;
  linkVideo!: string;
  reservedStock!: number;
  costPrice!: number;
  price!: number;
  photo!: string;
}

export { Product };
