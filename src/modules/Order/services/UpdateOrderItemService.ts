import { inject, injectable } from "tsyringe";
import { NotFoundError } from "../../../shared/helpers/apiErrors";
import { OrderItem } from "../entities/OrderItem";
import { IUpdateOrderItemStatusDTO } from "../dto/OrderItemDTO";
import { IOrderItemRepository } from "../repositories/OrderItemRepositoryInterface";
import { IUserRepository } from "../../User/repositories/UserRepositoryInterface";
import { IProductRepository } from "../../Products/repositories/ProductRepositoryInterface";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";

@injectable()
class UpdateOrderItemService {
  constructor(
    @inject('OrderItemRepository')
    private orderItemRepository: IOrderItemRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ id, status }: IUpdateOrderItemStatusDTO): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findById(id);

    if (!orderItem) {
      throw new NotFoundError('Item do pedido não encontrado!');
    }

    const product = await this.productRepository.findById(orderItem.productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado!');
    }

    orderItem.status = status;

    await this.orderItemRepository.update(orderItem);

    if(status === "TROCADO"){

      const order = await this.orderRepository.findById(orderItem.orderId);

      if (!order) {
        throw new NotFoundError('Pedido não encontrado!');
      }

      const userId = order.userId;

      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new NotFoundError('Usuário não encontrado!');
      }

      const totalCredits = product.price * orderItem.quantity;

      user.credits += totalCredits;

      await this.userRepository.update(user);
    }

    return orderItem;
  }
}
export { UpdateOrderItemService };
