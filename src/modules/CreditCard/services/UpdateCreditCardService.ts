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

    if (!creditCard) {
      throw new NotFoundError('Cartão não encontrado');
    }

    if(data.isMain) {
      const creditCards = await this.creditCardRepository.getAllByUserId(data.userId);

      if(creditCards){
        await Promise.all(creditCards.map(creditCard => {
          creditCard.isMain = false;
          return this.creditCardRepository.update(creditCard);
        }));
      }
    }

    creditCard.isMain = true;
    Object.assign(creditCard, data);
    const updatedcreditCard = await this.creditCardRepository.update(data);

    return updatedcreditCard;
  }
}

export { UpdateCreditCardService };
