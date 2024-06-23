import { container } from 'tsyringe';

import { IAddressRepository } from '../../modules/Address/repositories/AddressRepositoryInterface';
import { ICreditCardRepository } from '../../modules/CreditCard/repositories/CreditCardRepositoryInterface';
import { IUserRepository } from '../../modules/User/repositories/UserRepositoryInterface';
import { IProductRepository } from '../../modules/Products/repositories/ProductRepositoryInterface';
import { ITrackRepository } from '../../modules/Products/repositories/TrackRepositoryInterface';
import { ICartRepository } from '../../modules/Cart/repositories/CartRepositoryInterface';
import { ICartItemRepository } from '../../modules/Cart/repositories/CartItemRepositoryInterface';
import { ICouponRepository } from '../../modules/Coupon/repositories/CouponRepositoryInterface';
import { IOrderRepository } from '../../modules/Order/repositories/OrderRepositoryInterface';
import { IOrderItemRepository } from '../../modules/Order/repositories/OrderItemRepositoryInterface';
import { IOrderCardRepository } from '../../modules/Order/repositories/OrderCardRepositoryInterface';
import { IAdminRepository } from '../../modules/User/repositories/AdminRepositoryInterface';

import { AddressRepository } from '../../modules/Address/repositories/AddressRepository';
import { CreditCardRepository } from '../../modules/CreditCard/repositories/CreditCardRepository';
import { UserRepository } from '../../modules/User/repositories/UserRepository';
import { ProductRepository } from '../../modules/Products/repositories/ProductRepository';
import { TrackRepository } from '../../modules/Products/repositories/TrackRepository';
import { CartRepository } from '../../modules/Cart/repositories/CartRepository';
import { CartItemRepository } from '../../modules/Cart/repositories/CartItemRepository';
import { CouponRepository } from '../../modules/Coupon/repositories/CouponRepository';
import { OrderRepository } from '../../modules/Order/repositories/OrderRepository';
import { OrderItemRepository } from '../../modules/Order/repositories/OrderItemRepository';
import { OrderCardRepository } from '../../modules/Order/repositories/OrderCardRepository';
import { AdminRepository } from '../../modules/User/repositories/AdminRepository';


container.registerSingleton<IAddressRepository>('AddressRepository', AddressRepository);
container.registerSingleton<ICreditCardRepository>('CreditCardRepository', CreditCardRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository);
container.registerSingleton<ITrackRepository>('TrackRepository', TrackRepository);
container.registerSingleton<ICartRepository>('CartRepository', CartRepository);
container.registerSingleton<ICartItemRepository>('CartItemRepository', CartItemRepository);
container.registerSingleton<ICouponRepository>('CouponRepository', CouponRepository);
container.registerSingleton<IOrderRepository>('OrderRepository', OrderRepository);
container.registerSingleton<IOrderItemRepository>('OrderItemRepository', OrderItemRepository);
container.registerSingleton<IOrderCardRepository>('OrderCardRepository', OrderCardRepository);
container.registerSingleton<IAdminRepository>('AdminRepository', AdminRepository);
