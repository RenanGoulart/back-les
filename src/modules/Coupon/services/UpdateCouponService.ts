import { inject, injectable } from "tsyringe";
import { Coupon } from "../entities/Coupon";
import { ICouponRepository } from "../repositories/CouponRepositoryInterface";
import { IUpdateCouponDTO } from "../dto/CouponDTO";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class UpdateCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository
  ) {}

  async execute(id: string, data: IUpdateCouponDTO): Promise<Coupon> {
    const coupon = await this.couponRepository.findById(id);

    if(!coupon) {
      throw new NotFoundError('Cupom não encontrado');
    }

    Object.assign(coupon, data);

    const updatedCoupon = await this.couponRepository.update(coupon);
    return updatedCoupon;
  }
}

export { UpdateCouponService };
