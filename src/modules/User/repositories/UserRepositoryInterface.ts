import { ICreateUserDTO } from "../dto/CreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
  create(user: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  getAll(): Promise<User[] | undefined>;
  update(user: User): Promise<User>;
  delete(user: User): Promise<void>;
}

export { IUserRepository };
