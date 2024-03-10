import { Router } from "express";
import { CreditCardController } from "../controllers/CreditCardController";

const creditCardRouter = Router();

const creditCardController = new CreditCardController();

creditCardRouter.post("/", creditCardController.create);
creditCardRouter.get("/:id", creditCardController.findById);
creditCardRouter.get("/user/:id", creditCardController.list);
creditCardRouter.put("/:id", creditCardController.update);
creditCardRouter.delete("/:id", creditCardController.delete);

export { creditCardRouter };