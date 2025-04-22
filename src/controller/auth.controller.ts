import { Request, Response } from "express";
import authServices from "../service/auth.services";
import { AuthServices } from "../service/auth.services";

export class AuthController {
  // Gửi OTP
  static async sendOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await AuthServices.sendOTP(email);

      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }

  static async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      const result = await AuthServices.verifyOTP(email, otp);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }
}
