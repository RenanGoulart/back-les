import { CardBrand } from "@prisma/client"

class CreditCard {
    id!: string;
    number!: string;
    cardHolder!: string;
    cvv!: string;    
    cardBrand!: CardBrand;
    isMain!: boolean;
}
export { CreditCard } 