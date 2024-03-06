import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepositoryInterface";
import { IUpdateUserDTO } from "./dto/UpdateUserDTO";

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository') 
    private userRepository: IUserRepository
  ) {}

async execute(id: string, data: IUpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);

    if(!user) {
        throw new Error('Endereço não encontrado');
    }

    user.email = data.email;
    user.name = data.name;
    user.password = data.password;
    user.cpf = data.cpf;    
    user.ddd = data.ddd;
    user.phone = data.phone;
    user.phoneType = data.phoneType;
    user.gender = data.gender;
    user.birthDate = data.birthDate;
    user.status = data.status;
    user.addresses = data.addresses;
    user.cards = data.cards;
    
    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
    }
}

export { UpdateUserService };