import { PricingGroup, Category } from "@prisma/client";

interface ICreateProductDTO {
  artist: string;
  album: string;
  year: string;
  producer: string;
  numberOfTracks: string;
  height: string;
  width: string;
  weight: string;
  pricingGroup: PricingGroup;
  categories: Category[];
  barCode: string;
  quantityInStock: number;
  price: number;
  photo: string;
}
interface IUpdateProductDTO {
  id: string;
  artist: string;
  album: string;
  year: string;
  producer: string;
  numberOfTracks: string;
  height: string;
  width: string;
  weight: string;
  pricingGroup: PricingGroup;
  categories: Category[];
  barCode: string;
  quantityInStock: number;
  price: number;
  photo: string;
}

export { ICreateProductDTO, IUpdateProductDTO }
