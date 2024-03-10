import { CardBrand } from "@prisma/client";

interface IUpdateCreditCardDTO {
  id: string;
  number: string;
  cardHolder: string;
  cvv: string;
  isMain: boolean;
  cardBrand: CardBrand;
  userId: string;
}

export { IUpdateCreditCardDTO };