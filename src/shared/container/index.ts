import { container } from 'tsyringe';

import { IAddressRepository } from '../../modules/Address/repositories/AddressRepositoryInterface';
import { ICreditCardRepository } from '../../modules/CreditCard/repositories/CreditCardRepositoryInterface';
import { IUserRepository } from '../../modules/User/repositories/UserRepositoryInterface';
import { IProductRepository } from '../../modules/Products/repositories/ProductRepositoryInterface';
import { ICartRepository } from '../../modules/Cart/repositories/CartRepositoryInterface';
import { ICartItemRepository } from '../../modules/Cart/repositories/CartItemRepositoryInterface';
import { ICouponRepository } from '../../modules/Coupon/repositories/CouponRepositoryInterface';

import { AddressRepository } from '../../modules/Address/repositories/AddressRepository';
import { CreditCardRepository } from '../../modules/CreditCard/repositories/CreditCardRepository';
import { UserRepository } from '../../modules/User/repositories/UserRepository';
import { ProductRepository } from '../../modules/Products/repositories/ProductRepository';
import { CartRepository } from '../../modules/Cart/repositories/CartRepository';
import { CartItemRepository } from '../../modules/Cart/repositories/CartItemRepository';
import { CouponRepository } from '../../modules/Coupon/repositories/CouponRepository';

container.registerSingleton<IAddressRepository>('AddressRepository', AddressRepository);
container.registerSingleton<ICreditCardRepository>('CreditCardRepository', CreditCardRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository);
container.registerSingleton<ICartRepository>('CartRepository', CartRepository);
container.registerSingleton<ICartItemRepository>('CartItemRepository', CartItemRepository);
container.registerSingleton<ICouponRepository>('CouponRepository', CouponRepository);
