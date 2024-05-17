import { PricingGroup, Category, Track } from "@prisma/client";

interface ICreateProductRepositoryDTO {
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
  tracks: Track[];
}
interface ICreateProductDTO {
  artist: string;
  album: string;
  year: string;
  producer: string;
  height: string;
  width: string;
  weight: string;
  pricingGroup: PricingGroup;
  categories: Category[];
  quantityInStock: number;
  price: number;
  photo: string;
  tracks: Track[];
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

export { ICreateProductRepositoryDTO, ICreateProductDTO, IUpdateProductDTO }
