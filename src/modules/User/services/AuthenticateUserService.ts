import { compare } from "bcrypt";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../../../config/authConfig";
import { sign } from 'jsonwebtoken';
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/UserRepositoryInterface";
import { IAuthenticateUserDTO, IAuthenticateUserResponseDTO } from "../dto/AuthenticateUserDTO";
import { BadRequestError } from "../../../shared/helpers/apiErrors";
import { IAdminRepository } from "../repositories/AdminRepositoryInterface";


@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('AdminRepository')
    private adminRepository: IAdminRepository,
  ) {}

  async execute({ email, password }: IAuthenticateUserDTO) : Promise<IAuthenticateUserResponseDTO>{
    const admin = await this.adminRepository.findByEmail(email);

    if (admin) {
      if (password === admin.password) {
        const token = sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET as string, {
          subject: admin.id,
          expiresIn: '1d',
        });
        console.log(admin)
        console.log(token)
        return { token, role: admin.role };
      } else {
        throw new BadRequestError('Email ou senha incorretos');
      }
    }

    const user = await this.userRepository.findByEmail(email);
    console.log(user)
    if (!user) {
      throw new BadRequestError('Usuário não encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError("Email ou senha incorretos");
    }

    const token = sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: "1d",
    });
    console.log(token)
    return { token, role: user.role };
  }
}

export { AuthenticateUserService, JWT_SECRET };
