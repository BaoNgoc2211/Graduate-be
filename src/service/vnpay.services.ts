  import crypto from "crypto";
  import moment from "moment";
  import mongoose from "mongoose";
  import { Request, Response } from "express";
  import Order from "../model/order/order.model";
  import { OrderStatus } from "../enum/order-status.enum";
import orderServices from "./order/order.services";

  // dotenv.config();

  // process.env.TZ = "Asia/Ho_Chi_Minh";

  export const generatePaymentUrl = async (req: Request, res: Response): Promise<void> => {
    const { orderId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(404).json({ success: false, message: "Invalid order id" });
      return;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(401).json({ success: false, message: "OrderId not found" });
      return;
    }

    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");
    const expireDate = moment(date).add(15, "minutes").format("YYYYMMDDHHmmss");

    const ipAddr = "127.0.0.1"; // Có thể dùng req.ip hoặc req.headers['x-forwarded-for'] nếu dùng thực tế
    const tmnCode = process.env.VNP_TMNCODE || "";
    const secretKey = process.env.VNP_HASHSECRET || "";
    const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    const returnUrl =  process.env.VNP_RETURNURL || "";

    const locale = "vn";
    const currCode = "VND";

    const vnp_Params: Record<string, string | number> = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId.toString(),
      vnp_OrderInfo: `Payment for ${orderId}`,
      vnp_OrderType: "other",
      vnp_Amount: order.finalAmount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: expireDate,
    };

    const sortedParams = sortParams(vnp_Params);

    const urlParams = new URLSearchParams();
    for (const [key, value] of Object.entries(sortedParams)) {
      urlParams.append(key, value.toString());
    }

    const querystring = urlParams.toString();
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(querystring).digest("hex");

    urlParams.append("vnp_SecureHash", signed);
    const paymentUrl = `${vnpUrl}?${urlParams.toString()}`;

    res.json({ success: true, paymentUrl });
  };

  function sortParams(obj: Record<string, any>): Record<string, string | number> {
    return Object.entries(obj)
      .filter(([_, value]) => value !== "" && value !== undefined && value !== null)
      .sort(([key1], [key2]) => key1.localeCompare(key2))
      .reduce<Record<string, string | number>>((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  }
  export const handlePaymentResponse = async (req: Request, res: Response): Promise<void> => {
  // try {
  //   const vnp_ResponseCode = req.query.vnp_ResponseCode as string;
  

  //   if (!vnp_ResponseCode || !orderInfoRaw) {
  //     res.status(400).json({ success: false, message: "Thiếu thông tin phản hồi" });
  //     return;
  //   }

  //   if (vnp_ResponseCode !== "00") {
  //     // Thanh toán thất bại → redirect về trang thất bại
  //     res.redirect("https://your-app.com/failed");
  //     return;
  //   }

  //   // Parse dữ liệu được truyền từ lúc tạo paymentUrl
  //   const { orderId } = JSON.parse();

  //   // Tạo đơn hàng vì thanh toán đã thành công
  //   const result = await orderServices.checkOutSuccess(orderId);
  //   if (!result) {
  //     res.status(500).json({ success: false, message: "Không thể tạo đơn hàng" });
  //     return;
  //   }
  //    await orderServices.checkOutSuccess(orderId);

  //    res.redirect(`https://your-app.com/checkout-success?orderId=${result.order._id}`);
  //   // Cập nhật trạng thái đơn hàng

  // } catch (error) {
  //   console.error("Lỗi xử lý thanh toán:", error);
  //   res.status(500).json({ success: false, message: "Lỗi server khi xử lý thanh toán" });
  // }
  try {
    const vnp_ResponseCode = req.query.vnp_ResponseCode as string;
    const vnp_TxnRef = req.query.vnp_TxnRef as string; // chính là orderId

    console.log("vnp_ResponseCode:", vnp_ResponseCode);
    console.log("vnp_TxnRef:", vnp_TxnRef);

    if (vnp_ResponseCode !== "00") {
      console.log("❌ Thanh toán thất bại:", vnp_ResponseCode);
      res.redirect("http://localhost:8888/api/order/review/checkout/");
      return;
    }
    try {
      console.log("✅ Thanh toán thành công:", vnp_TxnRef);
      await orderServices.checkOutSuccess(vnp_TxnRef); // Cập nhật đơn hàng thành "Đã thanh toán"
      return res.redirect("http://localhost:8888")
  } catch (err) {
    console.error("❌ Lỗi xử lý đơn hàng:", err);
    return res.redirect("https://your-frontend.com/checkout-error");
  }
    
  } catch (error) {
    console.error("Lỗi xử lý thanh toán:", error);
    res.status(500).json({ success: false, message: "Lỗi server khi xử lý thanh toán" });
  }
};