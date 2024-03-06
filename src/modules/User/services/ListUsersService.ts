import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepositoryInterface";

@injectable()
class ListUsersService {
  constructor(
    @inject('UserRepository') 
    private userRepository: IUserRepository
  ) {}

  async execute(): Promise<User[] | undefined> {
    const users = await this.userRepository.getAll();
    return users;
  }
}

export { ListUsersService };