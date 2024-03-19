import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAddressService } from "../services/CreateAddressService";
import { ListAddressService } from "../services/ListAddressesService";
import { UpdateAddressService } from "../services/UpdateAddressService";
import { DeleteAddressService } from "../services/DeleteAddressService";
import { ListCountriesService } from "../services/ListCountriesService";
import { ListStatesService } from "../services/ListStatesService";
import { ListCitiesService } from "../services/ListCitiesService";
import { FindAddressService } from "../services/FindAddressesService";

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
    const { id } = request.params;

    const listAddressService = container.resolve(ListAddressService);

    const addressesList = await listAddressService.execute(id);

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

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const findAddressService = container.resolve(FindAddressService);

    const address = await findAddressService.execute(id);

    return response.status(200).json(address);
  }

  async listCountries(request: Request, response: Response) {
    const listCountriesService = container.resolve(ListCountriesService);

    const countriesList = await listCountriesService.execute();

    return response.status(200).json(countriesList);
  }

  async listStates(request: Request, response: Response) {
    const { id } = request.params;

    const listStatesService = container.resolve(ListStatesService);

    const statesList = await listStatesService.execute(id);

    return response.status(200).json(statesList);
  }

  async listCities(request: Request, response: Response) {
    const { id } = request.params;

    const listCitiesService = container.resolve(ListCitiesService);

    const citiesList = await listCitiesService.execute(id);

    return response.status(200).json(citiesList);
  }
}

export { AddressController };
