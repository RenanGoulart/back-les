import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { IUpdateOrderStatusDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";
import { NotFoundError } from "../../../shared/helpers/apiErrors";
import { IUserRepository } from "../../User/repositories/UserRepositoryInterface";
import { ICouponRepository } from "../../Coupon/repositories/CouponRepositoryInterface";

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CouponRepository')
    private couponRepository: ICouponRepository,
  ) {}

  public async execute({ id, status }: IUpdateOrderStatusDTO): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundError('Pedido não encontrado!');
    }

    order.status = status;

    await this.orderRepository.update(order);

    if(status === "TROCADO"){

      const userId = order.userId;

      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new NotFoundError('Usuário não encontrado!');
      }

      const couponId = order.couponId;
      let couponValue = 0;

      if (couponId) {
        const coupon = await this.couponRepository.findById(couponId);

        if (coupon) {
          couponValue = coupon.value ?? 0;
        }
      }

      const totalCredits = order.total - (order.freight + order.creditsUsed + couponValue);

      user.credits += totalCredits;

      await this.userRepository.update(user);
    }

    return order;
  }
}
export { UpdateOrderService };
