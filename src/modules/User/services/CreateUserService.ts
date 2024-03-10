import bcrypt from "bcrypt";
import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepositoryInterface";
import { ICreateUserDTO } from "../dto/CreateUserDTO";

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository') 
    private userRepository: IUserRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const hashedPassword = bcrypt.hashSync(data.password, 8);

    const user = await this.userRepository.create({ ...data, password: hashedPassword });

    return user;
  }
}

export { CreateUserService };