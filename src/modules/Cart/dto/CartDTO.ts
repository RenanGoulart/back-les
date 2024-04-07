interface ICreateCartServiceDTO {
  userId: string;
  productId: string;
}

interface ICreateCartRepositoryDTO {
  userId: string;
  total: number;
}

interface IUpdateCartServiceDTO {
  cartId: string;
  productId: string;
}

export { ICreateCartServiceDTO, ICreateCartRepositoryDTO, IUpdateCartServiceDTO }
