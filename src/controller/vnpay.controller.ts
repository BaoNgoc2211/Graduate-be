import { Request, Response } from "express";
import vnpayConfig from "../config/vnpay.config";
import { generatePaymentUrl,verifyPaymentResponse} from "../util/vnpay.util";
class VnPayController {
  async createPayment(req: Request, res: Response) {
    const { amount, orderId } = req.body;
    const paymentUrl = generatePaymentUrl(amount, orderId, vnpayConfig);
    res.json({ paymentUrl });
  }

  async paymentCallback(req: Request, res: Response) {
    const response = req.query;
    const isValid = verifyPaymentResponse(response, vnpayConfig);

    if (isValid) {
      // Handle successful payment
      res.status(200).json({ message: "Payment successful", data: response });
    } else {
      // Handle failed payment
      res.status(400).json({ message: "Payment failed", data: response });
    }
  }
}

export default new VnPayController();