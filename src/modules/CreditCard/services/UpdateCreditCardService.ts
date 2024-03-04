import { inject, injectable } from "tsyringe";
import { CreditCard } from "../entities/CreditCard";
import { ICreditCardRepository } from "../repositories/CreditCardRepositoryInterface";
import { IUpdateCreditCardDTO } from "./dto/UpdateCreditCardDTO";

@injectable()
class UpdateCreditCardService {
  constructor(
    @inject('CreditCardRepository') 
    private creditCardRepository: ICreditCardRepository
  ) {}

async execute(id: string, data: IUpdateCreditCardDTO): Promise<CreditCard> {
    const creditCard = await this.creditCardRepository.findById(id);

    if(!creditCard) {
        throw new Error('Cartão não encontrado');
    }

    creditCard.number = data.number;
    creditCard.cardHolder = data.cardHolder;
    creditCard.cvv = data.cvv;
    creditCard.cardBrand = data.cardBrand;
    creditCard.isMain = data.isMain;
    
    const updatedCreditCard = await this.creditCardRepository.save(creditCard);

    return updatedCreditCard;
    }
}

export { UpdateCreditCardService };