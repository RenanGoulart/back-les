import { prisma } from "../../../shared/database";
import { ICreateCouponDTO, IUpdateCouponDTO } from "../dto/CouponDTO";
import { Coupon } from "../entities/Coupon";
import { ICouponRepository } from "./CouponRepositoryInterface";

class CouponRepository implements ICouponRepository {
  async create({ name, value, quantity, expirationDate, orders }: ICreateCouponDTO): Promise<Coupon> {

    const coupon = await prisma.coupon.create({
      data: {
        name,
        value,
        quantity,
        expirationDate,
        orders: { create: orders }
      },
    });
    return coupon;
  }
  async findById(id: string): Promise<Coupon | null> {
    const coupon = await prisma.coupon.findUnique({
      where: { id },
    });
    return coupon;
  }
  async update({ id, name, value, quantity, expirationDate, orders }: IUpdateCouponDTO): Promise<Coupon> {
    const updatedCoupon = await prisma.coupon.update({
      where: { id },
      data: {
        name,
        value,
        quantity,
        expirationDate,
        orders: { create: orders }
      }
    });
    return updatedCoupon;
  }
  async delete(coupon: Coupon): Promise<void> {
    await prisma.coupon.delete({
      where: { id: coupon.id },
    });
  }

  async findByName(name: string): Promise<Coupon | null> {
    const coupon = await prisma.coupon.findUnique({
      where: { name },
    });
    return coupon;
  }

  async getAll(): Promise<Coupon[] | undefined> {
    const coupons = await prisma.coupon.findMany();
    return coupons;
  }


}

export { CouponRepository }
