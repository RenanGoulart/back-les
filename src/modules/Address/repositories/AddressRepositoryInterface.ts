import { ICreateAddressDTO } from "../dto/CreateAddressDTO";
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
  getCityById(cityId: string): Promise<City | null>;
}

export { IAddressRepository };