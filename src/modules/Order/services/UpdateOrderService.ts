import { inject, injectable } from "tsyringe";
import { IUpdateOrderStatusDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";
import { NotFoundError } from "../../../shared/helpers/apiErrors";
import { IUserRepository } from "../../User/repositories/UserRepositoryInterface";
import { ICouponRepository } from "../../Coupon/repositories/CouponRepositoryInterface";
import { IProductRepository } from "../../Products/repositories/ProductRepositoryInterface";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { IOrderItemRepository } from "../repositories/OrderItemRepositoryInterface";

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('OrderItemRepository')
    private orderItemRepository: IOrderItemRepository,
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

    const productsInStock = await this.productRepository.findByIds(order.orderItems.map(orderItem => orderItem.productId));

    if(status === "APROVADA"){
      // Atualiza quantidade em estoque
      await Promise.all(productsInStock.map(async product => {
        const orderItem = order.orderItems.find(orderItem => orderItem.productId === product.id);
        if (orderItem) {
          product.quantityInStock -= orderItem.quantity;
          await this.productRepository.updateInStock(product);
        }
      }));
    }

    if (status === "TROCA_AUTORIZADA") {
      // Atualiza o status de todos os itens do pedido
      await Promise.all(order.orderItems.map(async (orderItem) => {
        orderItem.status = status;
        await this.orderItemRepository.update(orderItem);
      }));
    }

    if (status === "TROCADO" || status === "REPROVADA") {
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

      if (order.creditsUsed > order.total) {
        user.credits += order.creditsUsed;
        await this.userRepository.update(user);
      } else {
        const totalCredits = order.total - (order.freight + order.creditsUsed + couponValue);
        user.credits += totalCredits;
        await this.userRepository.update(user);
      }

      if (status === "TROCADO") {
        // Atualiza o status de todos os itens do pedido
        await Promise.all(order.orderItems.map(async (orderItem) => {
          orderItem.status = status;
          await this.orderItemRepository.update(orderItem);
        }));

        // Atualiza quantidade em estoque
        await Promise.all(productsInStock.map(async product => {
          const orderItem = order.orderItems.find(orderItem => orderItem.productId === product.id);
          if (orderItem) {
            product.quantityInStock += orderItem.quantity;
            await this.productRepository.updateInStock(product);
          }
        }));
      }
    }

    return order;
  }
}
export { UpdateOrderService };
