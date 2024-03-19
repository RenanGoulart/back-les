import { CardBrand } from "@prisma/client";

interface ICreateCreditCardDTO {
  number: string;
  cardHolder: string;
  cvv: string;
  isMain: boolean;
  cardBrand: CardBrand;
  userId: string;
}

export { ICreateCreditCardDTO };
