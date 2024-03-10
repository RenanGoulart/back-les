
import { prisma } from "../../../shared/database";
import { User } from "../entities/User";
import { IUserRepository } from "./UserRepositoryInterface";
import { IUpdateUserDTO } from "../dto/UpdateUserDTO";
import { Gender, PhoneType, UserStatus } from "@prisma/client";
import { ICreateUserDTO } from "../dto/CreateUserDTO";

class UserRepository implements IUserRepository {
  async create({ email, name, password, cpf, ddd, phone, phoneType, gender, birthDate, status, addresses, cards }: ICreateUserDTO): Promise<User> {

    const user = await prisma.user.create({
      data: {
        email,
        name, 
        password, 
        cpf, 
        ddd, 
        phone, 
        phoneType: phoneType as PhoneType, 
        gender: gender as Gender, 
        birthDate, 
        status: status as UserStatus, 
        addresses: { create: addresses }, 
        cards: { create: cards }
      },
    });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
  
  async getAll(): Promise<User[] | undefined> {
    const users = await prisma.user.findMany();
    return users;
  }

  async update({id, email, name, password, cpf, ddd, phone, phoneType, gender, birthDate, status, addresses, cards}: IUpdateUserDTO): Promise<User> {
    const updatedUser = await prisma.user.update({ 
      where: { id },
      data: {
        email, 
        name, 
        password, 
        cpf, 
        ddd, 
        phone, 
        phoneType, 
        gender, 
        birthDate, 
        status, 
        addresses: { create: addresses }, 
        cards: { create: cards }
      }
    });
    return updatedUser;
  }

  async delete(user: User): Promise<void> {
    await prisma.user.delete({
      where: { id: user.id },
    });
  }
}

export { UserRepository };