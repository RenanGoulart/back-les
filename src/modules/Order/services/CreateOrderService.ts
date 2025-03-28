import { inject, injectable } from "tsyringe";
import { ICreateOrderDTO } from "../dto/OrderDTO";
import { Order } from "../entities/Order";
import { IOrderRepository } from "../repositories/OrderRepositoryInterface";
import { ICartRepository } from "../../Cart/repositories/CartRepositoryInterface";
import { IUserRepository } from "../../User/repositories/UserRepositoryInterface";
import { ICouponRepository } from "../../Coupon/repositories/CouponRepositoryInterface";
import { IProductRepository } from "../../Products/repositories/ProductRepositoryInterface";
import { BadRequestError, NotFoundError } from "../../../shared/helpers/apiErrors";
import { OrderCard } from "../entities/OrderCard";
import { OrderItem } from "../entities/OrderItem";

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
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

    const user = await this.userRepository.findById(cart.userId);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    // verificar se há produtos em estoque
    const productsInStock = await this.productRepository.findByIds(cart.cartItems.map(cartItem => cartItem.productId));

    productsInStock.forEach(product => {
      const cartItem = cart.cartItems.find(cartItem => cartItem.productId === product.id);
      if (cartItem && product.quantityInStock < cartItem.quantity) {
        throw new BadRequestError(`Produto ${product.album} - ${product.artist} sem estoque suficiente`);
      }
    });

    // verificar se o cupom é válido
    const coupon = couponId ? await this.couponRepository.findById(couponId) : null;
    if (coupon && coupon.expirationDate < new Date() || Number(coupon?.quantity) === 0) {
      throw new BadRequestError('Cupom expirado ou indisponível');
    }

    // verificar se o valor dos cartões é válido
    if (cards.length >= 1) {
        const cardsTotalPrice = cards.reduce((total, card) => total + card.value, 0);
        const maxCouponValue = coupon?.value || 0 + creditsUsed;

        if(maxCouponValue > cart.total){
          throw new BadRequestError('O valor dos cupons/créditos não pode ser maior que o valor total do carrinho');
        }

        if (cardsTotalPrice > maxCouponValue) {
          const isValueValid = cards.every(card => card.value >= 10);

          if (!isValueValid) {
            throw new BadRequestError('O valor mínimo de uma compra com cartão é de R$ 10,00');
          }
        }

        const totalPaid = cart.total + freight - creditsUsed - (coupon?.value || 0);

        if (cardsTotalPrice !== totalPaid){
          throw new BadRequestError('O valor total pago não corresponde ao valor total do carrinho');
        }
    }

    // cria os itens do pedido
    const orderItems = cart.cartItems.map(cartItem => ({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      salePrice: cartItem.salePrice,
      status: null,
    }));

    // cria os cartões do pedido
    const orderCards = cards.map(card => ({
      cardId: card.id,
      value: card.value,
    }))

    // cria o pedido
    const order = await this.orderRepository.create({
      addressId: addressId,
      creditsUsed: creditsUsed,
      freight: freight,
      code: String(new Date().getTime()),
      status: 'EM_PROCESSAMENTO',
      total: cart.total + freight - creditsUsed - (coupon?.value || 0),
      userId: cart.userId,
      couponId: coupon?.id || null,
      cards: orderCards as OrderCard[],
      orderItems: orderItems as OrderItem[],
    });

    // diminuir quantidade de cupom
    if (coupon) {
      coupon.quantity -= 1;
      await this.couponRepository.update(coupon);
    }

    // deleta o carrinho
    await this.cartRepository.delete(cartId);

    // debita os créditos do usuário
    user.credits -= creditsUsed;
    await this.userRepository.update(user);

    return order;
  }

}

export { CreateOrderService }
