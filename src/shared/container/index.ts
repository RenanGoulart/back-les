import { container } from 'tsyringe';

import { IAddressRepository } from '../../modules/Address/repositories/AddressRepositoryInterface';
import { ICreditCardRepository } from '../../modules/CreditCard/repositories/CreditCardRepositoryInterface';
import { IUserRepository } from '../../modules/User/repositories/UserRepositoryInterface';
import { AddressRepository } from '../../modules/Address/repositories/AddressRepository';
import { CreditCardRepository } from '../../modules/CreditCard/repositories/CreditCardRepository';
import { UserRepository } from '../../modules/User/repositories/UserRepository';

container.registerSingleton<IAddressRepository>('AddressRepository', AddressRepository);
container.registerSingleton<ICreditCardRepository>('CreditCardRepository', CreditCardRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
