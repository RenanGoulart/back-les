
import { prisma } from "../../../shared/database";
import { User } from "../entities/User";
import { IUserRepository } from "./UserRepositoryInterface";
import { ICreateUserRepositoryDTO } from "./dto/UserDTO";
import { IUpdateUserDTO } from "../services/dto/UpdateUserDTO";
import { Gender, PhoneType, UserStatus } from "@prisma/client";

class UserRepository implements IUserRepository {
  async create({ email, name, password, cpf, ddd, phone, phoneType, gender, birthDate, status, addresses, cards }: ICreateUserRepositoryDTO): Promise<User> {
    
    // const formattedAddresses = addresses.map(address => ({ ...address }));
    // const formattedCards = cards.map(card => ({ ...card }));

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
        // addresses: { create: formattedAddresses }, 
        // cards: { create: formattedCards }
      },
    });
    return user;
  }
  findByCep(cep: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
  getAllByUserId(user_id: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<User[] | undefined> {
    const users = await prisma.user.findMany();
    return users;
  }
  async save({id, email, name, password, cpf, ddd, phone, phoneType, gender, birthDate, status, addresses, cards}: IUpdateUserDTO): Promise<User> {
    
    const formattedAddresses = addresses.map(address => ({ ...address })); //cria copias - um novo objeto com as mesmas props
    const formattedCards = cards.map(card => ({ ...card }));

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
        addresses: { create: formattedAddresses }, 
        cards: { create: formattedCards }
      }
    });
    return updatedUser;
  }
  saveAll(user: User[]): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  async delete(user: User): Promise<void> {
    await prisma.user.delete({
      where: { id: user.id },
    });
  }
}

export { UserRepository };