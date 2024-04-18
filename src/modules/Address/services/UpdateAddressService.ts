import { inject, injectable } from "tsyringe";
import { Address } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";
import { IUpdateAddressDTO } from "../dto/AddressDTO";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository
  ) {}

async execute(id: string, data: IUpdateAddressDTO): Promise<Address> {
    const address = await this.addressRepository.findById(id);

    if(!address) {
      throw new NotFoundError('Endereço não encontrado');
    }

    Object.assign(address, data);
    const updatedAddress = await this.addressRepository.update(address);

    return updatedAddress;
    }
}

export { UpdateAddressService };
