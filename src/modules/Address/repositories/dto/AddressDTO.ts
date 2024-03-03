import { AddressType, ResidenceType, StreetType } from "@prisma/client";

interface ICreateAddressDTO {
  street: string;
  number: string;
  district: string;
  zipCode: string;
  observation: string;
  cityId: string;
  streetType: StreetType;
  addressType: AddressType;
  residenceType: ResidenceType;
  isMain: boolean;
  userId: string;
}

export { ICreateAddressDTO };