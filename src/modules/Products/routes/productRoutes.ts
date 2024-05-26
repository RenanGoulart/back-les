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
productRouter.put("/:id", upload.single('photo'), productController.update);
productRouter.delete("/:id", productController.delete);
productRouter.put("/stock/:id", productController.updateInStock);
productRouter.patch("/status/:id", productController.updateStatus);

export { productRouter };
