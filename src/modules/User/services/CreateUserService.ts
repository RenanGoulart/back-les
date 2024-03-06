import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepositoryInterface";
import { ICreateUserDTO } from "./dto/CreateUserDTO";

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository') 
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(data);

    return user;
  }
}

export { CreateUserService };