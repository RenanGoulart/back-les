import { Router } from "express";
import { AddressController } from "../controllers/AddressController";

const addressRouter = Router();

const addressController = new AddressController();

addressRouter.post("/", addressController.create);
addressRouter.get("/", addressController.list);

addressRouter.get("/:id", addressController.list);

export { addressRouter };