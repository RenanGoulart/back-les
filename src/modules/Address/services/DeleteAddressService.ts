import { inject, injectable } from "tsyringe";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";
import {  NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository
  ) {}

async execute(id: string): Promise<void> {
    const address = await this.addressRepository.findById(id);

    if(!address) {
        throw new NotFoundError('Endereço não encontrado');
    }
        await this.addressRepository.delete(address);
    }
}

export { DeleteAddressService };
