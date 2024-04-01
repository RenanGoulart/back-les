import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const productRouter = Router();

const productController = new ProductController();

productRouter.post("/", productController.create);
productRouter.get("/", productController.list);
productRouter.get("/:id", productController.findById);
productRouter.put("/:id", productController.update);
productRouter.delete("/:id", productController.delete);

export { productRouter };
