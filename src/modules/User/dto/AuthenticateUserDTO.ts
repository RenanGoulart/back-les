import { User } from "../entities/User";

interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

interface IAuthenticateUserResponseDTO{
  user?: User;
  token: string;
  role: string;
}

export { IAuthenticateUserDTO, IAuthenticateUserResponseDTO }
