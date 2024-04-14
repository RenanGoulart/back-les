import { Router } from "express";
import { CartController } from "../controllers/CartController";

const cartRouter = Router();

const cartController = new CartController();

cartRouter.post("/", cartController.create);
cartRouter.get("/:id", cartController.findByUserId);
cartRouter.put("/add/:id", cartController.updateAddItem);
cartRouter.put("/sub/:id", cartController.updateSubtractItem);
cartRouter.put("/remove/:id", cartController.updateRemoveItem);

export { cartRouter };
