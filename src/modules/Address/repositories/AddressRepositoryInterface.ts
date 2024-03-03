import { Address } from "../entities/Address";
import { ICreateAddressDTO } from "./dto/AddressDTO";

interface IAddressRepository {
  create(address: ICreateAddressDTO): Promise<Address>;
  findByCep(cep: string): Promise<Address | undefined>;
  findById(id: string): Promise<Address | undefined>;
  getAllByUserId(user_id: string): Promise<Address[]>;
  getAll(): Promise<Address[] | undefined>;
  save(address: Address): Promise<Address>;
  saveAll(address: Address[]): Promise<Address[]>;
  delete(address: Address): Promise<void>;
}

export { IAddressRepository };