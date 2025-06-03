import { IOrder } from "./../../interface/order/order.interface";
import asyncError from "../../middleware/error.middleware";
import orderServices from "../../service/order/order.services";
import { returnRes } from "../../util/response";
import { Request, Response } from "express";

class OrderDetailController {
  getAll = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.getAllOrders();
    returnRes(res, 200, "Get All", result);
  });

  getById = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.getOrderById(req.params.id);
    returnRes(res, 200, "Get Cart By ID", result!);
  });

  // create = asyncError(async (req: Request, res: Response) => {
  //   const {user_id} = req.body;
  //   console.log(user_id)
  //   const result = await orderServices.createOrder(user_id, req.body);
  //   returnRes(res, 201, "Created", result);
  // });
  checkOut = asyncError(async (req: Request, res: Response) => {
    const { user_id } = req.body;
    const result = await orderServices.checkOut(user_id);
    returnRes(res, 200, "Checkout Success", result);
  });
  
  updateStatus = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.updateStatusOrder(
      req.params.id,
      req.body
    );
    returnRes(res, 200, "Updated", result!);
  });
  update = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.updateOrder(req.params.id, req.body);
    returnRes(res, 200, "Updated", result!);
  });

  delete = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.deleteOrder(req.params.id);
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
