import { Request, Response } from "express";
import asyncError from "../middleware/error.middleware";
import { returnRes } from "../../util/response";
import jwtServices from "../service/jwt.services";
import authServices from "../service/auth.services";

class AuthController {
  //signin
  signin = asyncError(async (req: Request, res: Response) => {
    const { email } = req.body;
    await authServices.signIn(email);
    const accessToken = jwtServices.generateJwt;
    returnRes(res, 200, "Send OTP successful");
  });

  verifyEmail = asyncError(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    await authServices.verifyEmail(email, otp);
    returnRes(res, 200, "Verify email successful");
  });

  logout = asyncError(async (req: Request, res: Response) => {
    jwtServices.clearJwt(res);
    returnRes(res, 200, "Log out successful");
  });
}

export default new AuthController();
