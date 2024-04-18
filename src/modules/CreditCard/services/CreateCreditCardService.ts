import { inject, injectable } from "tsyringe";
import { CreditCard } from "../entities/CreditCard";
import { ICreditCardRepository } from "../repositories/CreditCardRepositoryInterface";
import { ICreateCreditCardDTO } from "../dto/CreditCardDTO";

@injectable()
class CreateCreditCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository
  ) {}

  async execute(data: ICreateCreditCardDTO): Promise<CreditCard> {
    const creditCard = await this.creditCardRepository.create(data);

    return creditCard;
  }
}

export { CreateCreditCardService };
