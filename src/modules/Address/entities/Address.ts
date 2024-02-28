
enum AddressType {
  COBRANCA,
  ENTREGA
}

enum StreetAddressType {
  RUA,
  AVENIDA,
  TRAVESSA,
  ALAMEDA,
  ESTRADA,
  OUTRO
}

enum ResidenceType {
  CASA,
  APARTAMENTO,
  CHACARA,
  CONDOMINIO,
  OUTRO
}

class Country {
  id!: string;
  name!: string;
  states!: State[];
}

class State {
  id!: string;
  name!: string;
  country!: Country;
  countryId!: string;
  cities!: City[];
}

class City {
  id!: string;
  name!: string;
  state!: State;
  stateId!: string;
  addresses!: Address[];
}

class Address {
  id!: string;
  residence!: string;
  number!: string;
  district!: string;
  zipCode!: string;
  observation!: string;
  cityId!: string;
  city!: string;
  addressType!: AddressType;
  streetAddressType!: StreetAddressType;
  residenceType!: ResidenceType;
}

export { Address, City, State, Country, AddressType, StreetAddressType, ResidenceType};