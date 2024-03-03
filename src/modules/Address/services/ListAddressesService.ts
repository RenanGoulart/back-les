import { inject, injectable } from "tsyringe";
import { Address } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";

@injectable()
class ListAddressService {
  constructor(
    @inject('AddressRepository') 
    private addressRepository: IAddressRepository
  ) {}

  async execute(): Promise<Address[] | undefined> {
    const addresses = await this.addressRepository.getAll();
    return addresses;
  }
}

export { ListAddressService };