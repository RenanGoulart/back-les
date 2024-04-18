import { inject, injectable } from "tsyringe";
import { Coupon } from "../entities/Coupon";
import { ICouponRepository } from "../repositories/CouponRepositoryInterface";

@injectable()
class ListCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository
  ) {}

  async execute(): Promise<Coupon[] | undefined> {
    const coupon = await this.couponRepository.getAll();
    return coupon;
  }
}

export { ListCouponService };
