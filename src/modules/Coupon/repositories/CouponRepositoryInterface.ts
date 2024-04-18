import { ICreateCouponDTO } from "../dto/CouponDTO";
import { Coupon } from "../entities/Coupon";

interface ICouponRepository {
  create(coupon: ICreateCouponDTO): Promise<Coupon>;
  findById(id: string): Promise<Coupon | null>;
  findByName(name: string): Promise<Coupon | null>;
  getAll(): Promise<Coupon[] | undefined>;
  update(coupon: Coupon): Promise<Coupon>;
  delete(coupon: Coupon): Promise<void>
}

export { ICouponRepository };
