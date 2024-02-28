import { Address } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepository";
import { ICreateAddressDTO } from "./dto/CreateAddressDTO";

class CreateAddressService {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(data: ICreateAddressDTO): Promise<Address> {
    const address = await this.addressRepository.create(data);

    return address;
  }
}

export { CreateAddressService };