import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/UserRepositoryInterface";
import { NotFoundError } from "../../../shared/helpers/apiErrors";

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    await this.userRepository.delete(user);
  }
}

export { DeleteUserService };
