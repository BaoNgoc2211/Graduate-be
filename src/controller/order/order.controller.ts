import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";
import { Request, Response } from "express";
import orderServices from "../../service/order/order.services";
import shippingController from "../shipping.controller";
import { generatePaymentUrl } from "../../service/vnpay.services";
import { createMomoPayment } from "../../service/momo.services";

class OrderDetailController {
  getAll = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.getAllOrders();
    returnRes(res, 200, "Get All", result);
  });

  getById = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.getOrderById(req.params.id);
    returnRes(res, 200, "Get Cart By ID", result!);
  });

  
  checkOut = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const selectItemIds = req.body.selectItemIds; // Assuming selectItemIds is passed in the request body
    const shippingId = req.body.shippingId; // Assuming shippingId is passed in the request body
    const paymentMethod = req.body.paymentMethod; // Assuming paymentMethod is passed in the request body
    if (!Array.isArray(selectItemIds)) {
      return res.status(400).json({ message: "selectedItemIds" });
    }
    const order = await orderServices.checkOutVNPAY(String(userId!),selectItemIds,shippingId,paymentMethod);
    if (paymentMethod === "VNPAY") {
    // Redirect đến trang thanh toán VNPay
    const paymentReq = {
      body: {
        orderId: order.orderId.toString()
      }
    } as Request;

    const fakeRes = {
      json: ({ paymentUrl }: any) => res.json({ success: true, paymentUrl }),
      status: (code: number) => ({
        json: (data: any) => res.status(code).json(data),
      }),
    } as Response;  

    await generatePaymentUrl(paymentReq, fakeRes);
  }else if (paymentMethod === "MOMO") {
    const momoResponse = await createMomoPayment({
      amount: order.finalAmount.toString(),
      orderInfo: `Thanh toán đơn hàng #${order.orderId}`
    });

    if (momoResponse?.payUrl) {
      return res.json({ success: true, paymentUrl: momoResponse.payUrl });
    } else {
      return res.status(500).json({ message: "Không thể tạo liên kết thanh toán MoMo." });
    }
  }else {
    await orderServices.checkOutCOD(String(userId!),selectItemIds,shippingId,paymentMethod);
    returnRes(res, 200, "Đặt hàng thành công", { order });
  }});


  reviewOrder = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const selectItemIds = req.body.selectItemIds; // Assuming selectItemIds is passed in the request body
    const shippingId = req.body.shippingId; // Assuming shippingId is passed in the request body
    const paymentMethod = req.body.paymentMethod; // Assuming paymentMethod is passed in the request body
    if (!Array.isArray(selectItemIds)) {
      return res.status(400).json({ message: "selectedItemIds" });
    }
    const result = await orderServices.reviewOrder(String(userId!),selectItemIds,shippingId,paymentMethod);
    
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
    console.log("User ID:", req.user);
    const userId = req.user;
    const result = await orderServices.checkStatusAllOrder(String(userId!));
    returnRes(res, 200, "Get Status Order", result!);
  });

  checkStatus = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const status = req.params.status;
    const result = await orderServices.checkStatusOrder(String(userId!), String(status!));
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
