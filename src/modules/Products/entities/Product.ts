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
  price!: string;
  photo!: string;
}

export { Product };
