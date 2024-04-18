import { inject, injectable } from "tsyringe";
import { ICouponRepository } from "../repositories/CouponRepositoryInterface";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class DeleteCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository
  ) {}

async execute(id: string): Promise<void> {
    const coupon = await this.couponRepository.findById(id);

    if(!coupon) {
      throw new NotFoundError('Cupom não encontrado');
    }

    await this.couponRepository.delete(coupon);
  }
}

export { DeleteCouponService };
