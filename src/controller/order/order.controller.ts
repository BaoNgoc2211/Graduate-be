import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";
import { Request, Response } from "express";
import orderServices from "../../service/order/order.services";
import shippingController from "../shipping.controller";
import { generatePaymentUrl } from "../../service/vnpay.services";

class OrderDetailController {
  getAll = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.getAllOrders();
    returnRes(res, 200, "Get All", result);
  });

  getById = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.getOrderById(req.params.id);
    returnRes(res, 200, "Get Cart By ID", result!);
  });

  
  // checkOut = asyncError(async (req: Request, res: Response) => {
  //   const userId = req.user;
  //   const selectItemIds = req.body.selectItemIds; // Assuming selectItemIds is passed in the request body
  //   const shippingId = req.body.shippingId; // Assuming shippingId is passed in the request body
  //   const paymentMethod = req.body.paymentMethod; // Assuming paymentMethod is passed in the request body
  //   if (!Array.isArray(selectItemIds)) {
  //     return res.status(400).json({ message: "selectedItemIds" });
  //   }
  //   const order = await orderServices.checkOut(String(userId!),selectItemIds,shippingId,paymentMethod);
  //   if (paymentMethod === "VNPAY") {
  //   // Redirect đến trang thanh toán VNPay
  //   const paymentReq = {
  //     body: {
  //       orderId: order.toString()
  //     }
  //   } as Request;

  //   const fakeRes = {
  //     json: ({ paymentUrl }: any) => res.json({ success: true, paymentUrl }),
  //     status: (code: number) => ({
  //       json: (data: any) => res.status(code).json(data),
  //     }),
  //   } as Response;

  //   await generatePaymentUrl(paymentReq, fakeRes);
  // } else {
  //   // COD → Trả kết quả thành công
  //   returnRes(res, 200, "Đặt hàng thành công", { order });
  // }
  //   // returnRes(res, 200, "Checkout Success", result);
  // });
  checkOut = asyncError(async (req: Request, res: Response) => {
  const userId = req.user;
  const selectItemIds = req.body.selectItemIds;
  const shippingId = req.body.shippingId;
  const paymentMethod = req.body.paymentMethod;

  if (!Array.isArray(selectItemIds)) {
    return res.status(400).json({ message: "selectedItemIds phải là mảng" });
  }

  const order = await orderServices.checkOut(
    String(userId!),
    selectItemIds,
    shippingId,
    paymentMethod
  );

  if (paymentMethod === "VNPAY") {
    // Gọi generatePaymentUrl và trả về link thanh toán cùng với thông tin order
    const paymentReq = {
      body: {
        orderId: order.order.id.toString(), // hoặc order.id
      },
    } as Request;

    const fakeRes = {
      json: ({ paymentUrl }: any) => res.json({
        success: true,
        message: "Tạo đơn hàng thành công",
        paymentUrl,
        order,
      }),
      status: (code: number) => ({
        json: (data: any) => res.status(code).json(data),
      }),
    } as Response;

    await generatePaymentUrl(paymentReq, fakeRes);
  } else if (paymentMethod === "MOMO") {

  } else
  {
    // Thanh toán COD
    return res.status(200).json({
      success: true,
      message: "Đặt hàng thành công",
      order,
    });
  }
});

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
