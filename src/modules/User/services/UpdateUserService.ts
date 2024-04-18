import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepositoryInterface";
import { IUpdateUserDTO } from "../dto/UpdateUserDTO";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

async execute(id: string, data: IUpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);

    if(!user) {
      throw new NotFoundError('Endereço não encontrado');
    }

    Object.assign(user, data);
    const updatedUser = await this.userRepository.update(user);

    return updatedUser;
    }
}

export { UpdateUserService };
