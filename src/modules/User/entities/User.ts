import { PhoneType, UserStatus, Gender, Address, CreditCard } from "@prisma/client";

class User{
  id!: string;
  email!: string;
  name!: string;
  password!: string;
  role!: string;
  cpf!: string;
  ddd!: string;
  phone!: string;
  phoneType!: PhoneType;
  gender!: Gender;
  birthDate!: Date;
  status!: UserStatus;
  credits!: number;
  addresses?: Address[];
  cards?: CreditCard[];
}

export { User };
