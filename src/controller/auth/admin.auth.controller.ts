import { Request, Response } from "express";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";
import jwtServices from "../../service/auth/jwt.services";
import adminAuthServices from "../../service/auth/admin.auth.services";


class AdminAuthController {

  signin = asyncError(async (req: Request, res: Response) => {
    const { email } = req.body;
  
    if (!email) {
      return returnRes(res, 400, "Email không được để trống");
    }
  
    const result = await adminAuthServices.signIn(email);
  
    return returnRes(res, 200, "Gửi OTP thành công", result);
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

  updateProfile = asyncError(async (req: Request, res: Response) => {
    const adminId = req.params.id;
    const updateData = req.body;
    const updatedAdmin = await adminAuthServices.updateProfile(adminId, updateData);
    if (!updatedAdmin) {
      // Trả lỗi tại đây và return để kết thúc
      return returnRes(res, 404, "Không tìm thấy admin");
    }
    returnRes(res, 200, "Cập nhật thông tin thành công",updatedAdmin);
  });

  findAll = asyncError(async(req:Request, res:Response)=>{
    const admins = await adminAuthServices.findAll();
    returnRes(res,200,"Find All",admins)
  });
}

export default new AdminAuthController();
