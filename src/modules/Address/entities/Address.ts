import { AddressType, ResidenceType, StreetType } from "@prisma/client";

class Country {
  id!: string;
  name!: string;
  states?: State[];
}

class State {
  id!: string;
  name!: string;
  country?: Country;
  countryId!: string;
  cities?: City[];
}

class City {
  id!: string;
  name!: string;
  state?: State;
  stateId!: string;
  addresses?: Address[];
}

class Address {
  id!: string;
  street!: string;
  number!: string;
  district!: string;
  zipCode!: string;
  observation!: string;
  cityId!: string;
  addressType!: AddressType;
  streetType!: StreetType;
  residenceType!: ResidenceType;
  isMain!: boolean;
}

export { Address, City, State, Country };
