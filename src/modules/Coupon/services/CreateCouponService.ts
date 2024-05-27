import { inject, injectable } from "tsyringe";
import { Coupon } from "../entities/Coupon";
import { ICouponRepository } from "../repositories/CouponRepositoryInterface";
import { ICreateCouponDTO } from "../dto/CouponDTO";
import { BadRequestError } from "../../../shared/helpers/apiErrors";

@injectable()
class CreateCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository
  ) {}

  async execute(data: ICreateCouponDTO): Promise<Coupon> {
    const couponExists = await this.couponRepository.findByName(data.name);

    if (couponExists && couponExists.expirationDate > new Date()) {
      throw new BadRequestError('Coupon já existe');
    }

    const expirationDate = new Date(data.expirationDate);
    expirationDate.setHours(expirationDate.getHours() + 3);

    const coupon = await this.couponRepository.create({ ...data, expirationDate });

    return coupon;
  }
}

export { CreateCouponService };
