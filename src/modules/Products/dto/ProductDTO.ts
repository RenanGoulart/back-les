import { PricingGroup, Category, Track } from "@prisma/client";

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
  linkVideo: string;
  costPrice: number;
  photo: string;
  tracks: Track[];
}

interface ICreateProductRepositoryDTO extends ICreateProductDTO {
  numberOfTracks: string;
  barCode: string;
  costPrice: number;
  price: number;
  curiosity: string;
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
  linkVideo: string;
  costPrice: number;
  photo: string;
  tracks: Track[];
}

interface IUpdateProductInStockDTO{
  id: string;
  quantityInStock: number;
  costPrice: number;
}

interface IUpdateProductStatusDTO{
  id: string;
  status: string;
  statusReason: string;
}

interface IUpdateProductRepositoryDTO extends IUpdateProductDTO {
  price: number;
}

interface IFindByAlbumAndArtist {
  album: string;
  artist: string;
}

export { ICreateProductRepositoryDTO, ICreateProductDTO, IUpdateProductDTO, IUpdateProductInStockDTO, IFindByAlbumAndArtist, IUpdateProductRepositoryDTO, IUpdateProductStatusDTO }
