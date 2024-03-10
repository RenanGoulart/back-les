import { inject, injectable } from "tsyringe";
import { Address } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";
import { IUpdateAddressDTO } from "../dto/UpdateAddressDTO";

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressRepository') 
    private addressRepository: IAddressRepository
  ) {}

async execute(id: string, data: IUpdateAddressDTO): Promise<Address> {
    const address = await this.addressRepository.findById(id);

    if(!address) {
        throw new Error('Endereço não encontrado');
    }

    address.street = data.street;
    address.number = data.number;
    address.district = data.district;
    address.zipCode = data.zipCode;
    address.observation = data.observation
    address.cityId = data.cityId;
    address.streetType = data.streetType;
    address.addressType = data.addressType;
    address.residenceType = data.residenceType;
    address.isMain = data.isMain;    

    const updatedAddress = await this.addressRepository.update(address);

    return updatedAddress;
    }
}

export { UpdateAddressService };