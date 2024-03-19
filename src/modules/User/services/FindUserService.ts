import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepositoryInterface";

@injectable()
class FindUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<User | null> {
    const user = await this.userRepository.findById(userId);
    return user;
  }
}

export { FindUserService };
