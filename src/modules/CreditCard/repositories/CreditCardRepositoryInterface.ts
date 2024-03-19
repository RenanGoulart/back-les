import { ICreateCreditCardDTO } from "../dto/CreateCreditCardDTO";
import { CreditCard } from "../entities/CreditCard";

interface ICreditCardRepository {
  create(creditCard: ICreateCreditCardDTO): Promise<CreditCard>;
  findById(id: string): Promise<CreditCard | null>;
  getAllByUserId(user_id: string): Promise<CreditCard[]>;
  update(creditCard: CreditCard): Promise<CreditCard>;
  delete(creditCard: CreditCard): Promise<void>;
}

export { ICreditCardRepository };
