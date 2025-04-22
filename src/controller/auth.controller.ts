import { AuthServices } from "./../service/auth.services";
import { Request, Response } from "express";
import asyncError from "../middleware/error.middleware";
import { returnRes } from "../../util/response";
import jwtServices from "../service/jwt.services";

class AuthController {
  sendOTP = asyncError(async (req: Request, res: Response) => {
    const { email } = req.body;
    await AuthServices.sendOTP(email);
    returnRes(res, 200, "Resend OTP successful");
  });

  verifyEmail = asyncError(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    await AuthServices.verifyOTP(email, otp);
    returnRes(res, 200, "Verify email successfull");
  });

  logout = asyncError(async (req: Request, res: Response) => {
    jwtServices.clearJwt(res);
    returnRes(res, 200, "Log out successful");
  });
}

export default new AuthController();
