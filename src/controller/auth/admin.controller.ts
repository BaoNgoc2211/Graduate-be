import { Request, Response } from "express";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";
import jwtServices from "../../service/auth/jwt.services";
import adminAuthServices from "../../service/auth/admin.auth.services";
import { IAdminRequest } from "../../types/express";

class AdminAuthController {
  findAll = asyncError(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const admins = await adminAuthServices.getAllAdmin(page,limit);
    returnRes(res, 200, "Find All", admins);
  });
  signUp = asyncError(async (req: Request, res: Response) => {
    const data = await adminAuthServices.signUp(req.body);
    const accessToken = jwtServices.generateAdminJwt(res, data.id);
    returnRes(res, 201, "Sign up successful", accessToken);
  });
   signin = asyncError(async (req: Request, res: Response) => {
    const data = await adminAuthServices.signIn(req.body);
    const accessToken = jwtServices.generateAdminJwt(res, data);
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
  updateProfile = asyncError(async (req: IAdminRequest, res: Response) => {
    const adminId = req.admin;
    const updated = await adminAuthServices.updateProfile(String(adminId), req.body);
    if (!updated) {
      // Trả lỗi tại đây và return để kết thúc
       returnRes(res, 404, "Không tìm thấy admin");
    }
    returnRes(res, 200, "Cập nhật thông tin thành công", updated);
  });

  findAdmin = asyncError(async (req: IAdminRequest, res: Response) => {
    const adminId = req.admin;
    console.log(adminId)
    const admins = await adminAuthServices.findById(String(adminId));
    console.log(admins)
    if (!admins) {
           returnRes(res, 404, "User not found");
        }
    returnRes(res, 200, "Find All", admins!);
  });

  
}

export default new AdminAuthController();
