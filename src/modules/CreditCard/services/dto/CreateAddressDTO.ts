import { AddressType, ResidenceType, StreetAddressType } from "../../entities/Address";

export interface ICreateAddressDTO {
  id: string;
  residence: string;
  number: string;
  district: string;
  zipCode: string;
  observation: string;
  cityId: string;
  city: string;
  addressType: AddressType;
  streetAddressType: StreetAddressType;
  residenceType: ResidenceType;
}