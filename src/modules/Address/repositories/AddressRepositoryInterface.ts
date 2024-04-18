import { ICreateAddressDTO } from "../dto/AddressDTO";
import { Address, City, Country, State } from "../entities/Address";

interface IAddressRepository {
  create(address: ICreateAddressDTO): Promise<Address>;
  findById(id: string): Promise<Address | null>;
  getAllByUserId(userId: string): Promise<Address[]>;
  update(address: Address): Promise<Address>;
  delete(address: Address): Promise<void>;
  getAllCountries(): Promise<Country[]>;
  getAllStatesByCountryId(countryId: string): Promise<State[]>;
  getAllCitiesByStateId(stateId: string): Promise<City[]>;
}

export { IAddressRepository };
