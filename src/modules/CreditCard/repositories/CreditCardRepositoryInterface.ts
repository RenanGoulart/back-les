import { CreditCard } from "../entities/CreditCard";
import { ICreateCreditCardDTO } from "./dto/CreditCardDTO";

interface ICreditCardRepository {
  create(creditCard: ICreateCreditCardDTO): Promise<CreditCard>; 
  findById(id: string): Promise<CreditCard | undefined>;
  getAllByUserId(user_id: string): Promise<CreditCard[]>;
  getAll(): Promise<CreditCard[] | undefined>;
  save(creditCard: CreditCard): Promise<CreditCard>;  
  delete(creditCard: CreditCard): Promise<void>;
}

export { ICreditCardRepository };