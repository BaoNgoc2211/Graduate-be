import { Request, Response } from "express";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";
import jwtServices from "../../service/auth/jwt.services";
import adminAuthServices from "../../service/auth/admin.auth.services";

class AdminAuthController {

  signUp = asyncError(async (req: Request, res: Response) => {
    const data = await adminAuthServices.signUp(req.body);
    const accessToken = jwtServices.generateJwt(res, data.id);
    returnRes(res, 201, "Sign up successful", accessToken);
  });
   signin = asyncError(async (req: Request, res: Response) => {
    const data = await adminAuthServices.signIn(req.body);
    const accessToken = jwtServices.generateJwt(res, data);
    returnRes(res, 200, "Đăng nhập thành công", accessToken);
  });
  // signin = asyncError(async (req: Request, res: Response) => {
  //   const { email } = req.body;
  //   await adminAuthServices.signIn(email);
  //   const accessToken = jwtServices.generateJwt;
  //   return returnRes(res, 200, "Send OTP successful");
  // });
  verifyEmail = asyncError(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    await adminAuthServices.verifyEmail(email, otp);
    returnRes(res, 200, "Verify email successful");
  });

  logout = asyncError(async (req: Request, res: Response) => {
    jwtServices.clearJwt(res);
    returnRes(res, 200, "Log out successful");
  });
  // checkAuth = asyncError(async (req: Request, res: Response) => {
  //   const user = req.admin;
  //   returnRes(res, 200, "Check authentication successful", user);
  // });
  updateProfile = asyncError(async (req: Request, res: Response) => {
    const adminId = req.user!;
    const updated = await adminAuthServices.updateProfile(String(adminId), req.body);
    if (!updated) {
      // Trả lỗi tại đây và return để kết thúc
      return returnRes(res, 404, "Không tìm thấy admin");
    }
    returnRes(res, 200, "Cập nhật thông tin thành công", updated);
  });

  findAdmin = asyncError(async (req: Request, res: Response) => {
    const adminId = req.user!;
    const admins = await adminAuthServices.findById(String(adminId));
    returnRes(res, 200, "Find All", admins!);
  });

  findAll = asyncError(async (req: Request, res: Response) => {
    const admins = await adminAuthServices.findAll();
    returnRes(res, 200, "Find All", admins);
  });
}

export default new AdminAuthController();
