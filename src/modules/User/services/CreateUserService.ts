import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepositoryInterface";
import { ICreateUserDTO } from "./dto/CreateUserDTO";
import { IAddressRepository } from "../../Address/repositories/AddressRepositoryInterface";
import { ICreditCardRepository } from "../../CreditCard/repositories/CreditCardRepositoryInterface";

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository') 
    private userRepository: IUserRepository,
    @inject('AddressRepository') 
    private addressRepository: IAddressRepository,
    @inject('CreditCardRepository') 
    private creditCardRepository: ICreditCardRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(data);

    const addresses = data.addresses.map(address => ({
      ...address,
      userId: user.id
    }));

    const addressesResponse = await this.addressRepository.createMany(addresses);
    const cardResponse = await this.creditCardRepository.create({ ...data.cards[0], userId: user.id });
    Object.assign(user, { addresses: addressesResponse, cards: [ cardResponse ] });

    return user;
  }
}

export { CreateUserService };