import { container } from 'tsyringe';

import { IAddressRepository } from '../../modules/Address/repositories/AddressRepositoryInterface';
import { AddressRepository } from '../../modules/Address/repositories/AddressRepository';

container.registerSingleton<IAddressRepository>('AddressRepository', AddressRepository);
