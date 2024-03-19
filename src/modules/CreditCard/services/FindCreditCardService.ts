import { inject, injectable } from "tsyringe";
import { CreditCard } from "../entities/CreditCard";
import { ICreditCardRepository } from "../repositories/CreditCardRepositoryInterface";

@injectable()
class FindCreditCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository
  ) {}

  async execute(creditCardId: string): Promise<CreditCard | null> {
    const creditCard = await this.creditCardRepository.findById(creditCardId);
    return creditCard;
  }
}

export { FindCreditCardService };
