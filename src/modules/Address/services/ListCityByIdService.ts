import { inject, injectable } from "tsyringe";
import { City } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";

@injectable()
class ListCityByIdService {
  constructor(
    @inject('AddressRepository') 
    private addressRepository: IAddressRepository
  ) {}

  async execute(cityId: string): Promise<City | null> {
    const city = await this.addressRepository.getCityById(cityId);
    return city;
  }
}

export { ListCityByIdService };