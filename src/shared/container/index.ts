import { container } from 'tsyringe';

import { IAddressRepository } from '../../modules/Address/repositories/AddressRepositoryInterface';
import { ICreditCardRepository } from '../../modules/CreditCard/repositories/CreditCardRepositoryInterface';
import { AddressRepository } from '../../modules/Address/repositories/AddressRepository';
import { CreditCardRepository } from '../../modules/CreditCard/repositories/CreditCardRepository';

container.registerSingleton<IAddressRepository>('AddressRepository', AddressRepository);
container.registerSingleton<ICreditCardRepository>('CreditCardRepository', CreditCardRepository);