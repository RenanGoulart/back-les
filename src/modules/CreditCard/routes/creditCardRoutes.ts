import { Router } from "express";
import { CreditCardController } from "../controllers/CreditCardController";

const creditCardRouter = Router();

const creditCardController = new CreditCardController();

creditCardRouter.post("/", creditCardController.create);
creditCardRouter.get("/", creditCardController.list);
creditCardRouter.put("/:id", creditCardController.update);
creditCardRouter.get("/:id", creditCardController.list);

export { creditCardRouter };