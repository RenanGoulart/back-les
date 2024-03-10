import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/", userController.create);
userRouter.get("/", userController.list);
userRouter.get("/:id", userController.findById);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

export { userRouter };