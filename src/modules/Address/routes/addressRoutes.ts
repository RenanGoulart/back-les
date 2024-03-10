import { Router } from "express";
import { AddressController } from "../controllers/AddressController";

const addressRouter = Router();

const addressController = new AddressController();

addressRouter.post("/", addressController.create);

addressRouter.get("/countries", addressController.listCountries);
addressRouter.get("/states/:id", addressController.listStates);
addressRouter.get("/cities/:id", addressController.listCities);
addressRouter.get("/user/:id", addressController.list);
addressRouter.get("/:id", addressController.findById);

addressRouter.put("/:id", addressController.update);

addressRouter.delete("/:id", addressController.delete);

// não fiz nada, só mudei a ordem das rotas

export { addressRouter };