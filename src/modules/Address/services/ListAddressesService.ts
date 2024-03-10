import { inject, injectable } from "tsyringe";
import { Address } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";

@injectable()
class ListAddressService {
  constructor(
    @inject('AddressRepository') 
    private addressRepository: IAddressRepository
  ) {}

  async execute(userId: string): Promise<Address[] | undefined> {
    const addresses = await this.addressRepository.getAllByUserId(userId);
    return addresses;
  }
}

export { ListAddressService };