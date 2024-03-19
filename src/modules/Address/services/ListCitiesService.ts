import { inject, injectable } from "tsyringe";
import { City } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";

@injectable()
class ListCitiesService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository
  ) {}

  async execute(stateId: string): Promise<City[] | undefined> {
    const cities = await this.addressRepository.getAllCitiesByStateId(stateId);
    return cities;
  }
}

export { ListCitiesService };
