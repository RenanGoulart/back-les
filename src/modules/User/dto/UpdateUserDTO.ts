import { PhoneType, UserStatus, Address, CreditCard, Gender } from "@prisma/client";

interface IUpdateUserDTO {
  id: string;
  email: string;
  name: string;
  password: string;
  cpf: string;
  ddd: string;
  phone: string;
  phoneType: PhoneType;
  gender: Gender;
  birthDate: Date;
  status: UserStatus;
  credits: number;
}

export { IUpdateUserDTO }
