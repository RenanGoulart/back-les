import { CardBrand } from "@prisma/client";

interface ICreateCreditCardDTO {
  number: string;
  cardHolder: string;
  cvv: string;
  isMain: boolean;
  cardBrand: CardBrand;
  userId: string;
}

interface IUpdateCreditCardDTO {
  id: string;
  number: string;
  cardHolder: string;
  cvv: string;
  isMain: boolean;
  cardBrand: CardBrand;
  userId: string;
}

interface IDeleteCreditCardDTO {
  id: string;
}


export { ICreateCreditCardDTO, IUpdateCreditCardDTO, IDeleteCreditCardDTO};
