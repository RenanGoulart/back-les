import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCreditCardService } from "../services/CreateCreditCardService";
import { ListCreditCardService } from "../services/ListCreditCardService";
import { UpdateCreditCardService } from "../services/UpdateCreditCardService";

class CreditCardController {
  async create(request: Request, response: Response) {
    const { number, cardHolder, cvv, isMain, cardBrand, userId} = request.body;

    const createCreditCardService = container.resolve(CreateCreditCardService);

    const creditCard = await createCreditCardService.execute({      
      number,
      cardHolder,
      cvv,
      isMain,
      cardBrand,
      userId,      
    });

    return response.status(201).json(creditCard);
  }

  async list(request: Request, response: Response) {
    const listCreditCardService = container.resolve(ListCreditCardService);

    const creditCardsList = await listCreditCardService.execute();

    return response.status(200).json(creditCardsList);
  }
  
  async update(request: Request, response: Response) {
    const { number, cardHolder, cvv, isMain, cardBrand, userId} = request.body;

    const updateCreditCardService = container.resolve(UpdateCreditCardService);
    
    const creditCard = await updateCreditCardService.execute(request.params.id, {
      number,
      cardHolder,
      cvv,
      isMain,
      cardBrand,
      userId, 
    });
    return response.status(201).json(creditCard);
  }
}

export { CreditCardController };