import { Request, Response } from "express";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";
import orderDetailServices from "../../service/order/order-detail.services";

class OrderDetailController {
  getAll = asyncError(async (req: Request, res: Response) => {
    const result = await orderDetailServices.getAllOrderDetails();
    returnRes(res, 200, "Get All", result);
  });

  getById = asyncError(async (req: Request, res: Response) => {
    const result = await orderDetailServices.getOrderDetailById(req.params.id);
    returnRes(res, 200, "Get OrderDetail By OrderId", result!);
  });

  create = asyncError(async (req: Request, res: Response) => {
    const result = await orderDetailServices.createOrderDetail(req.body);
    returnRes(res, 201, "Created", result);
  });

  update = asyncError(async (req: Request, res: Response) => {
    const result = await orderDetailServices.updateOrderDetail(
      req.params.id,
      req.body
    );
    returnRes(res, 200, "Updated", result!);
  });

  delete = asyncError(async (req: Request, res: Response) => {
    const result = await orderDetailServices.deleteOrderDetail(req.params.id);
    returnRes(res, 200, "Deleted", result!);
  });

  // getByUserId = asyncError(async (req: Request, res: Response) => {
  //   const result = await cartDetailServices.getCartDetailsByUserId(
  //     req.params.userId
  //   );
  //   returnRes(res, 200, "Get Cart By UserId", result);
  // });
}

export default new OrderDetailController();
