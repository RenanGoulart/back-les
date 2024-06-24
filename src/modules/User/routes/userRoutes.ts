import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthenticateUserController } from "../controllers/AuthenticationController";
import { ensureAuthenticated } from "../../../shared/middleware/ensureAuthenticated";

const userRouter = Router();
const authUserRouter = Router();

const userController = new UserController();
const authController = new AuthenticateUserController();

authUserRouter.post('/', authController.handle);

userRouter.post("/", userController.create);
userRouter.get("/", userController.list);
userRouter.get("/:id", userController.findById);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

export { userRouter, authUserRouter };
