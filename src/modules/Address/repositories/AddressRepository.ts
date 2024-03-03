import { AddressType, ResidenceType, StreetType } from "@prisma/client";
import { prisma } from "../../../shared/database";
import { Address } from "../entities/Address";
import { IAddressRepository } from "./AddressRepositoryInterface";
import { ICreateAddressDTO } from "./dto/AddressDTO";

class AddressRepository implements IAddressRepository {
  async create({ street, number, district, zipCode, observation, 
    cityId, streetType, addressType, residenceType, isMain, userId }: ICreateAddressDTO): Promise<Address> {
    const address = await prisma.address.create({
      data: {
        street,
        number,
        district,
        zipCode,
        observation,
        cityId,
        streetType: streetType as StreetType,
        addressType: addressType as AddressType,
        residenceType: residenceType as ResidenceType,
        isMain,
        userId,
      },
    });
    return address;
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
  async getAll(): Promise<Address[] | undefined> {
    const addresses = await prisma.address.findMany();
    return addresses;
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