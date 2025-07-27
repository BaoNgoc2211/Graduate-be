import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";
import { Request, Response } from "express";
import orderServices from "../../service/order/order.services";
import shippingController from "../shipping.controller";
import { generatePaymentUrl } from "../../service/vnpay.services";
import { createMomoPayment } from "../../service/momo.services";

class OrderDetailController {
  getAllOrder = asyncError(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await orderServices.getAllOrders(page,limit);
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
    const voucherCode = req.body.voucherCode; // Assuming voucherCode is passed in the request body
    if (!Array.isArray(selectItemIds)) {
      return res.status(400).json({ message: "selectedItemIds" });
    }
    
    if (paymentMethod === "VNPAY") {
    // Redirect đến trang thanh toán VNPay
    const order = await orderServices.checkOutVNPAY(String(userId!),selectItemIds,shippingId,paymentMethod,voucherCode);
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
    const order = await orderServices.checkOutVNPAY(String(userId!),selectItemIds,shippingId,paymentMethod,voucherCode);
    const momoResponse = await createMomoPayment({
      amount: order.finalAmount.toString(),
      orderInfo: `Thanh toán đơn hàng #${order.orderId}`,
      // redirectUrl: `https://yourfrontend.com/checkoutSuccess?orderId=${order.orderId}`,  // <-- Quan trọng
      // notifyUrl: `https://yourbackend.com/api/payment/momo/notify`
    });

    if (momoResponse?.payUrl) {
      return res.json({ success: true, paymentUrl: momoResponse.payUrl });
    } else {
      return res.status(500).json({ message: "Không thể tạo liên kết thanh toán MoMo." });
    }
  }else {
    const order = await orderServices.checkOutCOD(String(userId!),selectItemIds,shippingId,paymentMethod,voucherCode);
    console.log("Order in controller checkOut:", order);
    returnRes(res, 200, "Đặt hàng thành công", order);
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
    const {status} =req.body;
    const result = await orderServices.updateStatusOrder(
      req.params.id,
      status
    );
    returnRes(res, 200, "Updated", result!);
  });

  checkStatusAll = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const result = await orderServices.checkStatusAllOrder(String(userId!));
    returnRes(res, 200, "Get Status Order", result!);
  });

  checkStatusUser = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const status = req.params.status;
    const result = await orderServices.checkStatusOrderUser(String(userId!), String(status!));
    returnRes(res, 200, "Get Status Order", result!);
  });

  // update = asyncError(async (req: Request, res: Response) => {
  //   const result = await orderServices.updateStatusOrder(
  //     req.params.id,
  //     req.body.status
  //   );
  //   returnRes(res, 200, "Updated", result!);
  // });

  delete = asyncError(async (req: Request, res: Response) => {
    const result = await orderServices.deleteOrder(req.params.id);
    returnRes(res, 200, "Deleted", result!);
  });


  checkOrderStatus = asyncError(async (req: Request, res: Response) => {
    const status = req.params.status;
    const result = await orderServices.checkStatusOrder(String(status!));
    returnRes(res, 200, "Get Status Order", result!);
  });
  // getByUserId = asyncError(async (req: Request, res: Response) => {
  //   const result = await cartDetailServices.getCartDetailsByUserId(
  //     req.params.userId
  //   );
  //   returnRes(res, 200, "Get Cart By UserId", result);
  // });
}

export default new OrderDetailController();
