import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCreditCardService } from "../services/CreateCreditCardService";
import { ListCreditCardService } from "../services/ListCreditCardService";
import { UpdateCreditCardService } from "../services/UpdateCreditCardService";
import { DeleteCreditCardService } from "../services/DeleteCreditCardService";
import { FindCreditCardService } from "../services/FindCreditCardService";

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
    const { id } = request.params;
    const listCreditCardService = container.resolve(ListCreditCardService);

    const creditCardsList = await listCreditCardService.execute(id);

    return response.status(200).json(creditCardsList);
  }

  async update(request: Request, response: Response) {
    const { number, cardHolder, cvv, isMain, cardBrand, userId } = request.body;

    const { id } = request.params;

    const updateCreditCardService = container.resolve(UpdateCreditCardService);

    const creditCard = await updateCreditCardService.execute(id, {
      number,
      cardHolder,
      cvv,
      isMain,
      cardBrand,
      userId,
      id,
    });
    return response.status(201).json(creditCard);
  }

  async delete(request: Request, response: Response){
    const { id } = request.params;

    const deleteCreditCardService = container.resolve(DeleteCreditCardService);

    await deleteCreditCardService.execute(id);

    return response.status(204).send();
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const findCreditCardService = container.resolve(FindCreditCardService);

    const creditCard = await findCreditCardService.execute(id);

    return response.status(200).json(creditCard);
  }
}

export { CreditCardController };
