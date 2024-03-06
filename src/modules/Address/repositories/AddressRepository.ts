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

  async createMany(addressesParam: ICreateAddressRepositoryDTO[]): Promise<Address[]> {
    await prisma.address.createMany({
      data: addressesParam.map(address => ({
        street: address.street,
        number: address.number,
        district: address.district,
        zipCode: address.zipCode,
        observation: address.observation,
        cityId: address.cityId,
        streetType: address.streetType as StreetType,
        addressType: address.addressType as AddressType,
        residenceType: address.residenceType as ResidenceType,
        isMain: address.isMain,
        userId: address.userId,
      })),
    });

    return this.getAllByUserId(addressesParam[0].userId);
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
  async getAllByUserId(userId: string): Promise<Address[]> {
    const addresses = await prisma.address.findMany({
      where: { userId },
    });
    return addresses;
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