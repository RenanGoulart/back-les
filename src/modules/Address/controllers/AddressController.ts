import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAddressService } from "../services/CreateAddressService";
import { ListAddressService } from "../services/ListAddressesService";

class AddressController {
  async create(request: Request, response: Response) {
    const { street, number, district, zipCode, observation, cityId, streetType, addressType, residenceType, isMain, userId } = request.body;

    const createAddressService = container.resolve(CreateAddressService);

    const address = await createAddressService.execute({
      street,
      number,
      district,
      zipCode,
      observation,
      cityId,
      streetType,
      addressType,
      residenceType,
      isMain,
      userId,
    });

    return response.status(201).json(address);
  }
  async list(request: Request, response: Response) {
    const listAddressService = container.resolve(ListAddressService);

    const addressesList = await listAddressService.execute();

    return response.status(200).json(addressesList);
  }
}

export { AddressController };