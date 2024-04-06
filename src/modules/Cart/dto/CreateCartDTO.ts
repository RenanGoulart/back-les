import { CartStatus } from "@prisma/client";

interface ICreateCartServiceDTO {
  userId: string;
  productId: string;
}

interface ICreateCartRepositoryDTO {
  userId: string;
  total: number;
  status: CartStatus;
}

export { ICreateCartServiceDTO, ICreateCartRepositoryDTO }
