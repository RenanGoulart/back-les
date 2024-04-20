import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { IOrderItemRepository } from "../repositories/OrderItemRepositoryInterface";
import { IOrderCardRepository } from "../repositories/OrderCardRepositoryInterface";
import { ICreateOrderDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";
import { ICartRepository } from "@modules/Cart/repositories/CartRepositoryInterface";
import { ICouponRepository } from "@modules/Coupon/repositories/CouponRepositoryInterface";
import { IProductRepository } from "@modules/Products/repositories/ProductRepositoryInterface";
import { BadRequestError, NotFoundError } from "@shared/helpers/apiErrors";
import { OrderCard } from "../entities/OrderCard";

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('OrderItemRepository')
    private orderItemRepository: IOrderItemRepository,
    @inject('OrderCardRepository')
    private orderCardRepository: IOrderCardRepository,
    @inject('CartRepository')
    private cartRepository: ICartRepository,
    @inject('CouponRepository')
    private couponRepository: ICouponRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({ addressId, cartId, couponId, freight, cards, creditsUsed }: ICreateOrderDTO): Promise<Order> {

    const cart = await this.cartRepository.findById(cartId);

    if (!cart) {
      throw new NotFoundError('Carrinho não encontrado');
    }

    let couponIdValue = null;
    let couponValue = 0;
    if (couponId) {
      const coupon = await this.couponRepository.findById(couponId);
      couponIdValue = coupon ? coupon.id : null;
      if (coupon) {
        couponValue = coupon.value;
      }
    }

    const totalProducts = cart.cartItems.reduce((total, cartItem) => {
      return total + cartItem.salePrice * cartItem.quantity;
    },0);

    if (creditsUsed >= totalProducts) {
      throw new BadRequestError('Os créditos utilizados não podem superar o valor da compra');
    }


    if (cards.length > 1) {
      const isValueValid = cards.every(card => card.value >= 10);

      if (!isValueValid) {
        throw new BadRequestError('O valor mínimo de uma compra com cartão é de R$ 10,00');
      }

      const cardsTotalPrice = cards.reduce((total, card) => total + card.value, 0);

      const totalPaid = cardsTotalPrice + creditsUsed + freight + couponValue ;
      if (totalPaid != cart.total){
        throw new BadRequestError('O valor total pago não corresponde ao valor total do carrinho');
      }
    }

    function generateOrderNumber(length: number): string {
      return Math.random().toString().slice(2, length);
    }


    const order = await this.orderRepository.create({
      addressId: addressId,
      creditsUsed: creditsUsed,
      freight:freight,
      code: generateOrderNumber(10),
      status: 'EM_PROCESSAMENTO',
      total: totalProducts + freight,
      userId: cart.userId,
      cartId: cartId,
      couponId: couponIdValue,
      cards: cards
    });

    // criando um order card para cada card
    const orderCards = await Promise.all(cards.map(async (card) => {
      const orderCard = new OrderCard();
      orderCard.value = card.value;
      orderCard.orderId = order.id;
      orderCard.cardId = card.cardId;

      await this.orderCardRepository.create(orderCard);

      return orderCard;
    }));
    order.cards = orderCards;

    const products = await this.productRepository.findByIds(cart.cartItems.map(cartItem => cartItem.productId));

    const orderItems = await Promise.all(cart.cartItems.map(async (cartItem) => {
    const product = products.find(p => p.id === cartItem.productId);
    if (!product) {
      throw new NotFoundError('Produto não encontrado');
    }

    const orderItem = await this.orderItemRepository.create({
      orderId: order.id,
      quantity: cartItem.quantity,
      productId: cartItem.productId,
    });

    return orderItem;
    }));

    order.orderItems = orderItems;

    return order;
  }

}

export { CreateOrderService }
