import { PhoneType, Gender, UserStatus, Address, CreditCard } from "@prisma/client";

interface ICreateUserRepositoryDTO {
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

export { ICreateUserRepositoryDTO }