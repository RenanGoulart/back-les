import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.post("/", orderController.create);
orderRouter.put("/:id", orderController.update);

export { orderRouter };
