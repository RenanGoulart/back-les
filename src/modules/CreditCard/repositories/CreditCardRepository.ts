import { CardBrand } from "@prisma/client";
import { prisma } from "../../../shared/database";
import { CreditCard } from "../entities/CreditCard";
import { ICreditCardRepository } from "./CreditCardRepositoryInterface";
import { IUpdateCreditCardDTO } from "../dto/UpdateCreditCardDTO";
import { ICreateCreditCardDTO } from "../dto/CreateCreditCardDTO";

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

  async findById(id: string): Promise<CreditCard | null> {
    const creditCard = await prisma.creditCard.findUnique({
      where: { id },
    });
    return creditCard;
  }

  async getAllByUserId(userId: string): Promise<CreditCard[]> {
    const cards = await prisma.creditCard.findMany({
      where: { userId },
    });
    return cards;
  }

  async update({id, number, cardHolder, cvv, isMain, cardBrand, userId }: IUpdateCreditCardDTO): Promise<CreditCard> {
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

  async delete(creditCard: CreditCard): Promise<void> {
    await prisma.creditCard.delete({
      where: { id: creditCard.id },
    });
  }
}

export { CreditCardRepository };