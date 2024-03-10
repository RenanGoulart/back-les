import { inject, injectable } from "tsyringe";
import { Address } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";

@injectable()
class FindAddressService {
  constructor(
    @inject('AddressRepository') 
    private addressRepository: IAddressRepository
  ) {}

  async execute(addressId: string): Promise<Address | null> {
    const address = await this.addressRepository.findById(addressId);
    return address;
  }
}

export { FindAddressService };