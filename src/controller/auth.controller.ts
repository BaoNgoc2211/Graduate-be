import { Request, Response } from "express";
import asyncError from "../middleware/error.middleware";
import { returnRes } from "../../util/response";
import jwtServices from "../service/auth/jwt.services";
import authServices from "../service/auth/auth.services";

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

  loginSuccess(req: Request, res: Response) {
    if (!req.user) return res.redirect('/login');
    res.json({ message: 'Đăng nhập thành công', user: req.user });
  }

  loginFailure(req: Request, res: Response) {
    res.status(401).json({ message: 'Đăng nhập thất bại' });
  }

  
}

export default new AuthController();
