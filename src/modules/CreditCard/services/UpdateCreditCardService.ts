import { inject, injectable } from "tsyringe";
import { CreditCard } from "../entities/CreditCard";
import { ICreditCardRepository } from "../repositories/CreditCardRepositoryInterface";
import { NotFoundError } from "../../../shared/helpers/apiErrors";
import { IUpdateCreditCardDTO } from "../dto/CreditCardDTO";

@injectable()
class UpdateCreditCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository
  ) {}

async execute(id: string, data: IUpdateCreditCardDTO): Promise<CreditCard> {
    const creditCard = await this.creditCardRepository.findById(id);

    if(!creditCard) {
      throw new NotFoundError('Cartão não encontrado');
    }

    Object.assign(creditCard, data);
    const updatedCreditCard = await this.creditCardRepository.update(creditCard);

    return updatedCreditCard;
    }
}

export { UpdateCreditCardService };
