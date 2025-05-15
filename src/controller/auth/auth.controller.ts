import { Request, Response } from "express";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../../util/response";
import jwtServices from "../../service/auth/jwt.services";
import authServices from "../../service/auth/auth.services";
import adminAuthServices from "../../service/auth/admin.auth.services";

class AuthController {
  //signin
  signin = asyncError(async (req: Request, res: Response) => {
    const email = req.body.email;
    await authServices.signIn(email);
    console.log("🚀 ~ AuthController ~ signin=asyncError ~ email:", email)
    // const accessToken = jwtServices.generateJwt;
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
  findAll = asyncError(async(req:Request, res:Response)=>{
    const admins = await authServices.findAll();
    returnRes(res,200,"Find All",admins)
  });

  updateInfo = asyncError(async(req:Request, res:Response)=>{
    const userId = req.params.id;
    const updateData = req.body;
    const updateUser = await authServices.updateProfile(userId,updateData)
    if (!updateUser) {
          // Trả lỗi tại đây và return để kết thúc
          return returnRes(res, 404, "Không tìm thấy admin");
        }
    returnRes(res,200,"Cập nhật thành công",updateUser);
  });
}
export default new AuthController;
