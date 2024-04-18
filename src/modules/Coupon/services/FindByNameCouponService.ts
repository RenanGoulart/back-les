import { inject, injectable } from "tsyringe";
import { Coupon } from "../entities/Coupon";
import { ICouponRepository } from "../repositories/CouponRepositoryInterface";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class FindByNameCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository
  ) {}

  async execute(name: string): Promise<Coupon> {
    const coupon = await this.couponRepository.findByName(name);

    if(!coupon) {
      throw new NotFoundError('Cupom não encontrado');
    }

    return coupon;
  }
}

export { FindByNameCouponService };
