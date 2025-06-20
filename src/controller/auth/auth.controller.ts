import { Request, Response } from "express";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";
import jwtServices from "../../service/auth/jwt.services";
import authServices from "../../service/auth/auth.services";

class AuthController {
  signUp = asyncError(async (req: Request, res: Response) => {
    const data = await authServices.signUp(req.body);
    const accessToken = jwtServices.generateJwt(res, data.id);
    returnRes(res, 201, "Sign up successful", accessToken);
  });
  verifyEmail = asyncError(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    await authServices.verifyEmail(email, otp);
    returnRes(res, 200, "Verify email successful");
  });
  // signin
  signin = asyncError(async (req: Request, res: Response) => {
    const data = await authServices.signIn(req.body);
    const accessToken = jwtServices.generateJwt(res, data);
    returnRes(res, 200, "Đăng nhập thành công", accessToken);
  });

  loginSuccess(req: Request, res: Response) {
    if (!req.user) return res.redirect("/login");
    res.json({ message: "Đăng nhập thành công", user: req.user });
  }

  loginFailure(req: Request, res: Response) {
    res.status(401).json({ message: "Đăng nhập thất bại" });
  }
  logout = asyncError(async (req: Request, res: Response) => {
    jwtServices.clearJwt(res);
    returnRes(res, 200, "Log out successful");
  });

  findAll = asyncError(async (req: Request, res: Response) => {
    const admins = await authServices.findAll();
    returnRes(res, 200, "Find All", admins);
  });
  // resendOTP = asyncError(async (req: Request, res: Response) => {
  //   const { email } = req.body;
  //   await authServices.resendOTP(email);
  //   returnRes(res, 200, "Resend OTP successful");
  // });

  // forgotPassword = asyncError(async (req: Request, res: Response) => {
  //   const { email } = req.body;
  //   await authServices.forgotPassword(email);
  //   returnRes(res, 200, `OTP sent to ${email}`);
  // });

  // resetPassword = asyncError(async (req: Request, res: Response) => {
  //   const { email, otp, newPassword } = req.body;
  //   await authServices.resetPassword(email, otp, newPassword);
  //   returnRes(res, 200, "Reset password successful");
  // });

  checkAuth = asyncError(async (req: Request, res: Response) => {
    const user = req.user;
    returnRes(res, 200, "Check authentication successful", user);
  });
  updateInfo = asyncError(async (req: Request, res: Response) => {
    const updateUser = await authServices.updateProfile(
      req.params.id,
      req.body
    );
    if (!updateUser) {
      return returnRes(res, 404, "Không tìm thấy admin");
    }
    returnRes(res, 200, "Cập nhật thành công", updateUser);
  });
}
export default new AuthController();
