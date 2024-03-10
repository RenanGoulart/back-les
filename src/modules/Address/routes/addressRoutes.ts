import { Router } from "express";
import { AddressController } from "../controllers/AddressController";

const addressRouter = Router();

const addressController = new AddressController();

addressRouter.post("/", addressController.create);
addressRouter.get("/:id", addressController.list);
addressRouter.put("/:id", addressController.update);
addressRouter.delete("/:id", addressController.delete);

addressRouter.get("/countries", addressController.listCountries);
addressRouter.get("/states/:id", addressController.listStates);
addressRouter.get("/cities/:id", addressController.listCities);
addressRouter.get("/city/:id", addressController.listCityById);


export { addressRouter };