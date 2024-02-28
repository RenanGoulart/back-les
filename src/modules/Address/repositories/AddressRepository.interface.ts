import { Address } from "../entities/Address";
import { IAddressRepository } from "./AddressRepository";

class AddressRepository implements IAddressRepository {
  create(address: Address): Address {
    throw new Error("Method not implemented.");
  }
  findByCep(cep: string): Promise<Address | undefined> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Address | undefined> {
    throw new Error("Method not implemented.");
  }
  getAllByUserId(user_id: string): Promise<Address[]> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Address[]> {
    throw new Error("Method not implemented.");
  }
  save(address: Address): Promise<Address> {
    throw new Error("Method not implemented.");
  }
  saveAll(address: Address[]): Promise<Address[]> {
    throw new Error("Method not implemented.");
  }
  delete(address: Address): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { AddressRepository };