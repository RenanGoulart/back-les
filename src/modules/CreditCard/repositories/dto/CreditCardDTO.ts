import { CardBrand } from "@prisma/client";

interface ICreateCreditCardRepositoryDTO {
  number: string;
  cardHolder: string;
  cvv: string;
  isMain: boolean;
  cardBrand: CardBrand;
  userId: string;
}

export { ICreateCreditCardRepositoryDTO };