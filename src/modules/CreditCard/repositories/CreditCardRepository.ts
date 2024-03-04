import { CardBrand } from "@prisma/client";
import { prisma } from "../../../shared/database";
import { CreditCard } from "../entities/CreditCard";
import { ICreditCardRepository } from "./CreditCardRepositoryInterface";
import { ICreateCreditCardDTO } from "./dto/CreditCardDTO";
import { IUpdateCreditCardDTO } from "../services/dto/UpdateCreditCardDTO";

class CreditCardRepository implements ICreditCardRepository {
  async create({ number, cardHolder, cvv, isMain, cardBrand, userId }: ICreateCreditCardDTO): Promise<CreditCard> {
    const creditCard = await prisma.creditCard.create({
      data: {
        number,
        cardHolder,
        cvv,
        isMain,
        cardBrand: cardBrand as CardBrand,              
        userId,
      },
    });
    return creditCard;
  }

  findById(id: string): Promise<CreditCard | undefined> {
    throw new Error("Method not implemented.");
  }
  getAllByUserId(user_id: string): Promise<CreditCard[]> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<CreditCard[] | undefined> {
    const creditCards = await prisma.creditCard.findMany();
    return creditCards;
  }
  async save({ number, cardHolder, cvv, isMain, cardBrand, userId }: IUpdateCreditCardDTO): Promise<CreditCard> {
    const updatedCreditCard = await prisma.creditCard.update({
      where: { id },
      data: {
        number,
        cardHolder,
        cvv,
        isMain,
        cardBrand: cardBrand as CardBrand,              
        userId,          
      }
    });
    return updatedCreditCard;
  }
  delete(creditCard: CreditCard): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { CreditCardRepository };