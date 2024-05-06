import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { IUpdateOrderStatusDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";
import { NotFoundError } from "../../../shared/helpers/apiErrors";
import { IUserRepository } from "../../User/repositories/UserRepositoryInterface";
import { ICouponRepository } from "../../Coupon/repositories/CouponRepositoryInterface";
import { IProductRepository } from "../../Products/repositories/ProductRepositoryInterface";

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CouponRepository')
    private couponRepository: ICouponRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ id, status }: IUpdateOrderStatusDTO): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundError('Pedido não encontrado!');
    }

    order.status = status;

    await this.orderRepository.update(order);

    if(status === "APROVADA"){
      const productsInStock = await this.productRepository.findByIds(order.orderItems.map(orderItem => orderItem.productId));

      Promise.all(productsInStock.map(async product => {
        const orderItem = order.orderItems.find(orderItem => orderItem.productId === product.id);
        if (orderItem) {
          product.quantityInStock -= orderItem.quantity;
          await this.productRepository.update(product);
        }
      }));
    }

    if(status === "TROCADO" || status === "REPROVADA"){

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

      if(status=="TROCADO"){
        const productsInStock = await this.productRepository.findByIds(order.orderItems.map(orderItem => orderItem.productId));

        Promise.all(productsInStock.map(async product => {
          const orderItem = order.orderItems.find(orderItem => orderItem.productId === product.id);
          if (orderItem) {
            product.quantityInStock += orderItem.quantity;
            await this.productRepository.update(product);
          }
        }));
      }
    }

    return order;
  }
}
export { UpdateOrderService };
