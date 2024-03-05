import { AddressType, ResidenceType, StreetType } from "@prisma/client";
import { prisma } from "../../../shared/database";
import { Address } from "../entities/Address";
import { IAddressRepository } from "./AddressRepositoryInterface";
import { ICreateAddressRepositoryDTO } from "./dto/AddressDTO";
import { IUpdateAddressDTO } from "../services/dto/UpdateAddressDTO";

class AddressRepository implements IAddressRepository {
  async create({ street, number, district, zipCode, observation, 
    cityId, streetType, addressType, residenceType, isMain, userId }: ICreateAddressRepositoryDTO): Promise<Address> {
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
  async findById(id: string): Promise<Address | undefined> {
    const address = await prisma.address.findUnique({
      where: { id },
    });
    return address;
  }
  getAllByUserId(user_id: string): Promise<Address[]> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<Address[] | undefined> {
    const addresses = await prisma.address.findMany();
    return addresses;
  }
  async save({id, street, number, district, zipCode, observation, 
    cityId, streetType, addressType, residenceType, isMain, userId}: IUpdateAddressDTO): Promise<Address> {
    const updatedAddress = await prisma.address.update({ 
      where: { id },
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
        userId
      }
    });
    return updatedAddress;
  }
  saveAll(address: Address[]): Promise<Address[]> {
    throw new Error("Method not implemented.");
  }
  async delete(address: Address): Promise<void> {
    await prisma.address.delete({
      where: { id: address.id },
    });
  }
}

export { AddressRepository };