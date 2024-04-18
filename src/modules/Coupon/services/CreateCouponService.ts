import { inject, injectable } from "tsyringe";
import { Coupon } from "../entities/Coupon";
import { ICouponRepository } from "../repositories/CouponRepositoryInterface";
import { ICreateCouponDTO } from "../dto/CouponDTO";

@injectable()
class CreateCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository
  ) {}

  async execute(data: ICreateCouponDTO): Promise<Coupon> {
    const coupon = await this.couponRepository.create(data);

    return coupon;
  }
}

export { CreateCouponService };
