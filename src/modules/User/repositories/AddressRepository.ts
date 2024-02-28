import { Address } from "../entities/Address";

interface IAddressRepository {
  create(address: Address): Address;
  findByCep(cep: string): Promise<Address | undefined>;
  findById(id: string): Promise<Address | undefined>;
  getAllByUserId(user_id: string): Promise<Address[]>;
  getAll(): Promise<Address[]>;
  save(address: Address): Promise<Address>;
  saveAll(address: Address[]): Promise<Address[]>;
  delete(address: Address): Promise<void>;
}

export { IAddressRepository };