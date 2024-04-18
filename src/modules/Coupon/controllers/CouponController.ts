import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCouponService } from "../services/CreateCouponService";
import { ListCouponService } from "../services/ListCouponService";
import { DeleteCouponService } from "../services/DeleteCouponService";
import { UpdateCouponService } from "../services/UpdateCouponService";
import { FindByIdCouponService } from "../services/FindByIdCouponService";
import { FindByNameCouponService } from "../services/FindByNameCouponService";

class CouponController {
  async create(request: Request, response: Response) {
    const { name, value, quantity, expirationDate, orders } = request.body;

    const createCouponService = container.resolve(CreateCouponService);

    const coupon = await createCouponService.execute({
      name,
      value,
      quantity,
      expirationDate,
      orders
    });

    return response.status(201).json(coupon);
  }

  async list(request: Request, response: Response) {
    const listCouponService = container.resolve(ListCouponService);

    const couponsList = await listCouponService.execute();

    return response.status(200).json(couponsList);
  }

  async update(request: Request, response: Response) {
    const { name, value, quantity, expirationDate, orders } = request.body;

    const { id } = request.params;

    const updateCouponService = container.resolve(UpdateCouponService);

    const coupon = await updateCouponService.execute(id, {
      name,
      value,
      quantity,
      expirationDate,
      orders,
      id
    });
    return response.status(201).json(coupon);
  }

  async delete(request: Request, response: Response){
    const { id } = request.params;

    const deleteCouponService = container.resolve(DeleteCouponService);

    await deleteCouponService.execute(id);

    return response.status(204).send();
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const findCouponServiceById = container.resolve(FindByIdCouponService);

    const coupon = await findCouponServiceById.execute(id);

    return response.status(200).json(coupon);
  }

  async findByName(request: Request, response: Response) {
    const { name } = request.params as { name: string }

    const findCouponServiceByName = container.resolve(FindByNameCouponService);

    const coupon = await findCouponServiceByName.execute(name);

    return response.status(200).json(coupon);
  }
}

export { CouponController };
