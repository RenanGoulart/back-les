import { inject, injectable } from "tsyringe";
import { CreditCard } from "../entities/CreditCard";
import { ICreditCardRepository } from "../repositories/CreditCardRepositoryInterface";

@injectable()
class ListCreditCardService {
  constructor(
    @inject('CreditCardRepository') 
    private creditCardRepository: ICreditCardRepository
  ) {}

  async execute(): Promise<CreditCard[] | undefined> {
    const creditCards = await this.creditCardRepository.getAll();
    return creditCards;
  }
}

export { ListCreditCardService };