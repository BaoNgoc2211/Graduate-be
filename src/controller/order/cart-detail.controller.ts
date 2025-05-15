import { Request, Response } from "express";
import cartDetailServices from "../../service/order/cart-detail.services";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";

class CartDetailController {
  create = asyncError(async (req: Request, res: Response) => {
    const result = await cartDetailServices.createCartDetail(req.body);
    returnRes(res, 201, "Created", result);
  });

  update = asyncError(async (req: Request, res: Response) => {
    const result = await cartDetailServices.updateCartDetail(
      req.params.id,
      req.body
    );
    returnRes(res, 200, "Updated", result!);
  });

  delete = asyncError(async (req: Request, res: Response) => {
    const result = await cartDetailServices.deleteCartDetail(req.params.id);
    returnRes(res, 200, "Deleted", result!);
  });

  getById = asyncError(async (req: Request, res: Response) => {
    const result = await cartDetailServices.getCartDetailById(req.params.id);
    returnRes(res, 200, "Get Cart By ID", result!);
  });

  getAll = asyncError(async (req: Request, res: Response) => {
    const result = await cartDetailServices.getAllCartDetails();
    returnRes(res, 200, "Get All", result);
  });

  getByUserId = asyncError(async (req: Request, res: Response) => {
    const result = await cartDetailServices.getCartDetailsByUserId(
      req.params.userId
    );
    returnRes(res, 200, "Get Cart By UserId", result);
  });
}

export default new CartDetailController();
