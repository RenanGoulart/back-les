import { compare } from "bcrypt";
import { JWT_SECRET } from "../../../config/authConfig";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/UserRepositoryInterface";
import { IAuthenticateUserDTO } from "../dto/AuthenticateUserDTO";

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ email, password }: IAuthenticateUserDTO) {
    console.log(JWT_SECRET)

    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new Error("Usuário não encontrado");
    }

    const passwordMatch = await compare(password, userExist.password);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos");
    }

    const token = sign({ email: email }, JWT_SECRET, { //sign cria um token JWT
      subject: "Admin",
      expiresIn: "1d",
    });
    return token;
  }
}

export { AuthenticateUserService, JWT_SECRET };
