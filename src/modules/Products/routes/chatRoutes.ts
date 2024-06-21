import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const chatRouter = Router();

const productController = new ProductController();

chatRouter.post("/:id", productController.chat);
export { chatRouter };
