import { Router } from "express";
import { CartController } from "../controllers/CartController";

const cartRouter = Router();

const cartController = new CartController();

cartRouter.post("/", cartController.create);
cartRouter.get("/", cartController.list);
cartRouter.get("/:id", cartController.findById);
cartRouter.put("/:id", cartController.update);
cartRouter.delete("/:id", cartController.delete);

export { cartRouter };
