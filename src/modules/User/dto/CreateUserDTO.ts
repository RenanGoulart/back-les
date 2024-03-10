import { PhoneType, UserStatus, Address, CreditCard, Gender } from "@prisma/client";

interface ICreateUserDTO {
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
    addresses: Address[];
    cards: CreditCard[];
}

export { ICreateUserDTO }