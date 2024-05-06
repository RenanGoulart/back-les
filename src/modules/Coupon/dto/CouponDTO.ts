interface ICreateCouponDTO {
  name: string;
  value: number;
  quantity: number;
  expirationDate: Date;
}

interface IUpdateCouponDTO {
  id: string;
  name:string;
  value: number;
  quantity: number;
  expirationDate: Date;
}

interface IDeleteCouponDTO {
  id: string;
}

export { ICreateCouponDTO, IUpdateCouponDTO, IDeleteCouponDTO }
