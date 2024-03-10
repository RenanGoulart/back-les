import { AddressType, ResidenceType, StreetType } from "@prisma/client";
import { prisma } from "../../../shared/database";
import { Address, City, Country, State } from "../entities/Address";
import { IAddressRepository } from "./AddressRepositoryInterface";
import { IUpdateAddressDTO } from "../dto/UpdateAddressDTO";
import { ICreateAddressDTO } from "../dto/CreateAddressDTO";

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

  async findById(id: string): Promise<Address | null> {
    const address = await prisma.address.findUnique({
      where: { id },
      include: { city: { include: { state: { include: { country: true } } } } }
    });
    return address;
  }

  async getAllByUserId(userId: string): Promise<Address[]> {
    const addresses = await prisma.address.findMany({
      where: { userId },
    });

    const addressesWithCity = await Promise.all(addresses.map(async address => {
      const city = await prisma.city.findUnique({
        where: { id: address.cityId },
        include: { state: { include: { country: true } } }
      });
      return { ...address, city };
    }))

    return addressesWithCity;
  }

  async update({id, street, number, district, zipCode, observation, 
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

  async delete(address: Address): Promise<void> {
    await prisma.address.delete({
      where: { id: address.id },
    });
  }
  
  getAllCountries(): Promise<Country[]> {
    const countries = prisma.country.findMany();
    return countries;
  }

  getAllStatesByCountryId(countryId: string): Promise<State[]> {
    const states = prisma.state.findMany({
      where: { countryId: countryId },
    });
    return states;
  }

  getAllCitiesByStateId(stateId: string): Promise<City[]> {
    const cities = prisma.city.findMany({
      where: { stateId: stateId },
    });
    return cities;
  }
}

export { AddressRepository };