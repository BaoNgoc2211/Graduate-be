import { Request, Response } from "express";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";
import jwtServices from "../../service/auth/jwt.services";
import authServices from "../../service/auth/auth.services";

class AuthController {
  //
  findAll = asyncError(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const user = await authServices.getAllUser(page,limit);
    returnRes(res, 200, "Find All", user);
  });


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
  signin = asyncError(async (req: Request, res: Response) => {
    const data = await authServices.signIn(req.body);
    const accessToken = jwtServices.generateJwt(res, data);
    returnRes(res, 200, "Đăng nhập thành công", accessToken);
  });

  logout = asyncError(async (req: Request, res: Response) => {
    jwtServices.clearJwt(res);
    returnRes(res, 200, "Log out successful");
  });
  checkAuth = asyncError(async (req: Request, res: Response) => {
    const user = req.user;
    returnRes(res, 200, "Check authentication successful", user);
  });
  loginSuccess(req: Request, res: Response) {
    if (!req.user) return res.redirect("/login");
    res.json({ message: "Đăng nhập thành công", user: req.user });
  }

  loginFailure(req: Request, res: Response) {
    res.status(401).json({ message: "Đăng nhập thất bại" });
  }

  

  getProfile = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const user = await authServices.getProfile(String(userId));
    if (!user) {
      return returnRes(res, 404, "User not found");
    }
    returnRes(res, 200, "Get profile successful", user);
  });
  // resendOTP = asyncError(async (req: Request, res: Response) => {
  //   const { email } = req.body;
  //   await authServices.resendOTP(email);
  //   returnRes(res, 200, "Resend OTP successful");
  // });

  forgotPassword = asyncError(async (req: Request, res: Response) => {
    const { email } = req.body;
    const data = await authServices.forgotPassword(email);
    returnRes(res, 200, `OTP sent to ${email}`);
  });

  resetPassword = asyncError(async (req: Request, res: Response) => {
    const { email, otp, newPassword } = req.body;
    await authServices.resetPassword(email, otp, newPassword);
    returnRes(res, 200, "Reset password successful");
  });
  
  updateInfo = asyncError(async (req: Request, res: Response) => {
    const userId = req.user!
    const updated = await authServices.updateProfile(String(userId), req.body);

    if (!updated) return returnRes(res, 404, "Không tìm thấy user");
    returnRes(res, 200, "Cập nhật thành công", updated);
  });
}
export default new AuthController();
