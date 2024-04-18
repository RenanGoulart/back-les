import { inject, injectable } from "tsyringe";
import { Coupon } from "../entities/Coupon";
import { ICouponRepository } from "../repositories/CouponRepositoryInterface";

@injectable()
class FindByIdCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository
  ) {}

  async execute(couponId: string): Promise<Coupon | null> {
    const coupon = await this.couponRepository.findById(couponId);

    if(!coupon) {
      throw new Error('Cupom não encontrado');
    }

    return coupon;
  }
}

export { FindByIdCouponService };
