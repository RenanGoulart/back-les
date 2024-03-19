import { inject, injectable } from "tsyringe";
import { CreditCard } from "../entities/CreditCard";
import { ICreditCardRepository } from "../repositories/CreditCardRepositoryInterface";

@injectable()
class DeleteCreditCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository
  ) {}

async execute(id: string): Promise<void> {
    const creditCard = await this.creditCardRepository.findById(id);

    if(!creditCard) {
        throw new Error('Cartão não encontrado');
    }
        await this.creditCardRepository.delete(creditCard);
    }
}

export { DeleteCreditCardService };
