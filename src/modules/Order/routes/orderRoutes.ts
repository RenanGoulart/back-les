import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.get("/", orderController.list);
orderRouter.get("/user/:id", orderController.findByUserId);
orderRouter.post("/", orderController.create);
orderRouter.put("/:id", orderController.updateOrder);
orderRouter.put("/item/:id", orderController.updateOrderItem);
orderRouter.put("/exchange/:id", orderController.exchangeRequest);
export { orderRouter };
