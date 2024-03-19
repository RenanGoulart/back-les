import { inject, injectable } from "tsyringe";
import { State } from "../entities/Address";
import { IAddressRepository } from "../repositories/AddressRepositoryInterface";

@injectable()
class ListStatesService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository
  ) {}

  async execute(countryId: string): Promise<State[] | undefined> {
    const states = await this.addressRepository.getAllStatesByCountryId(countryId);
    return states;
  }
}

export { ListStatesService };
