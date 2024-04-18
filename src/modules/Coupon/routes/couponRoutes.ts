import { Router } from "express";
import { CouponController } from "../controllers/CouponController";

const couponRouter = Router();

const couponController = new CouponController();

couponRouter.post("/", couponController.create);
couponRouter.get("/", couponController.list);
couponRouter.get("/:id", couponController.findById);
couponRouter.get("/name/:name", couponController.findByName);
couponRouter.put("/:id", couponController.update);
couponRouter.delete("/:id", couponController.delete);

export { couponRouter };

