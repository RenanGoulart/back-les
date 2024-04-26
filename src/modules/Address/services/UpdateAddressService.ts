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

    if (!address) {
      throw new NotFoundError('Endereço não encontrado');
    }

    if(data.isMain) {
      const addresss = await this.addressRepository.getAllByUserId(data.userId);

      if(addresss){
        await Promise.all(addresss.map(address => {
          address.isMain = false;
          return this.addressRepository.update(address);
        }));
      }
    }

    address.isMain = true;
    Object.assign(address, data);
    const updatedAddress = await this.addressRepository.update(data);

    return updatedAddress;
    }
}

export { UpdateAddressService };
