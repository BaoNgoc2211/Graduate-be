import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";
import { Request, Response } from "express";
import orderServices from "../../service/order/order.services";

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
  // checkOut = asyncError(async (req: Request, res: Response) => {
  //   const userId = req.user;
  //   console.log(userId);
  //   const data = await orderServices.checkout(String(userId!), req.body);
  //   returnRes(res, 200, "Checkout Success", data!);
  // });
  checkOut = asyncError(async (req: Request, res: Response) => {
    // const { user_id } = req.body;
    
    const userId = req.user;
    const selectItemIds = req.body.selectItemIds; // Assuming selectItemIds is passed in the request body
    console.log("BODY RECEIVED:", req.body);
    if (!Array.isArray(selectItemIds)) {
      return res.status(400).json({ message: "selectedItemIds" });
    }
    const result = await orderServices.checkOut(String(userId!),selectItemIds);
    returnRes(res, 200, "Checkout Success", result);
  });

  reviewOrder = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const selectItemIds = req.body.selectItemIds; // Assuming selectItemIds is passed in the request body
    console.log("BODY RECEIVED:", req.body);
    if (!Array.isArray(selectItemIds)) {
      return res.status(400).json({ message: "selectedItemIds" });
    }
    const result = await orderServices.reviewOrder(String(userId!),selectItemIds);
    returnRes(res, 200, "Review Order Success", result);
  });

  updateStatus = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.updateStatusOrder(
      req.params.id,
      req.body
    );
    returnRes(res, 200, "Updated", result!);
  });

  checkStatusAll = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.checkStatusAllOrder(req.params.userId);
    returnRes(res, 200, "Get Status Order", result!);
  });

  checkStatus = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.checkStatusOrder(
      req.params.userId,
      req.params.status
    );
    returnRes(res, 200, "Get Status Order", result!);
  });

  update = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.updateStatusOrder(
      req.params.id,
      req.body.status
    );
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
