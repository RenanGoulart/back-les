import { inject, injectable } from "tsyringe";
import { Address } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";
import { ICreateAddressDTO } from "../dto/AddressDTO";

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository
  ) {}

  async execute(data: ICreateAddressDTO): Promise<Address> {

    if(data.isMain) {
      const addresses = await this.addressRepository.getAllByUserId(data.userId);

      await Promise.all(addresses.map(address => {
        address.isMain = false;
        return this.addressRepository.update(address);
      }));
    }

    const address = await this.addressRepository.create(data);

    return address;
  }
}

export { CreateAddressService };
