import bcrypt from "bcrypt";
import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepositoryInterface";
import { ICreateUserDTO } from "../dto/CreateUserDTO";
import { validatePassword } from "../../../shared/helpers/validatePassword";

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    validatePassword(data.password);

    const hashedPassword = bcrypt.hashSync(data.password, 8);

    const user = await this.userRepository.create({ ...data, password: hashedPassword });

    return user;
  }
}

export { CreateUserService };
