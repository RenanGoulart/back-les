import { User } from "../entities/User";
import { ICreateUserRepositoryDTO } from "./dto/UserDTO";

interface IUserRepository {
  create(user: ICreateUserRepositoryDTO): Promise<User>;
  findByCep(cep: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  getAllByUserId(user_id: string): Promise<User[]>;
  getAll(): Promise<User[] | undefined>;
  save(user: User): Promise<User>;  
  delete(user: User): Promise<void>;
}

export { IUserRepository };