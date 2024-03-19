import { inject, injectable } from "tsyringe";
import { Country } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";

@injectable()
class ListCountriesService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository
  ) {}

  async execute(): Promise<Country[] | undefined> {
    const countries = await this.addressRepository.getAllCountries();
    return countries;
  }
}

export { ListCountriesService };
