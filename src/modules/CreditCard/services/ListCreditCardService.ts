import { inject, injectable } from "tsyringe";
import { CreditCard } from "../entities/CreditCard";
import { ICreditCardRepository } from "../repositories/CreditCardRepositoryInterface";

@injectable()
class ListCreditCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository
  ) {}

  async execute(userId: string): Promise<CreditCard[] | undefined> {
    const creditCards = await this.creditCardRepository.getAllByUserId(userId);
    return creditCards;
  }
}

export { ListCreditCardService };
