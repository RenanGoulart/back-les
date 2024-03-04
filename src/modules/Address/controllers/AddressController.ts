import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAddressService } from "../services/CreateAddressService";
import { ListAddressService } from "../services/ListAddressesService";
import { UpdateAddressService } from "../services/UpdateAddressService";
import { DeleteAddressService } from "../services/DeleteAddressService";

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

  async update(request: Request, response: Response) {
    const { street, number, district, zipCode, observation, cityId, streetType, addressType, residenceType, isMain, userId } = request.body;

    const { id } = request.params;

    const updateAddressService = container.resolve(UpdateAddressService);
    
    const address = await updateAddressService.execute(id, {
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
      id,
    });
    return response.status(201).json(address);
  }
  
  async delete(request: Request, response: Response){
    const { id } = request.params;

    const deleteAddress = container.resolve(DeleteAddressService);

    await deleteAddress.execute(id);

    return response.status(204).send();
  }
}

export { AddressController };