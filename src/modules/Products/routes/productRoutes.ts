import { Router } from "express";
import uploadsConfig from '../../../config/multerConfig'
import { ProductController } from "../controllers/ProductController";
import multer from "multer";

const productRouter = Router();
const upload = multer(uploadsConfig);

const productController = new ProductController();

productRouter.post("/", upload.single('photo'), productController.create);
productRouter.get("/", productController.list);
productRouter.get("/:id", productController.findById);
productRouter.put("/:id", productController.update);
productRouter.delete("/:id", productController.delete);
productRouter.put("/stock/:id", productController.updateInStock);

export { productRouter };
