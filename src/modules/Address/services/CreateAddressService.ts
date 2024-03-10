import { inject, injectable } from "tsyringe";
import { Address } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";
import { ICreateAddressDTO } from "../dto/CreateAddressDTO";

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressRepository') 
    private addressRepository: IAddressRepository
  ) {}

  async execute(data: ICreateAddressDTO): Promise<Address> {
    const address = await this.addressRepository.create(data);

    return address;
  }
}

export { CreateAddressService };