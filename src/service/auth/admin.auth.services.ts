import Admin from "../../model/admin.model";
import { EmailService } from "../auth/email.services";
import throwError from "../../util/create-error";
import authRepository from "../../repository/auth.repository";

class AdminAuthServices {
  private async checkEmail(email: string) {
    if (await authRepository.findEmail(email)) {
      throwError(404, "Email is already exists");
    }
  }
  private async checkVerifyEmail(email: string) {
    const user = await Admin.findOne({ email });
    if (!user) {
      throwError(404, "User not found");
    }
    return user?.isEmailVerified;
  }
  private async getUserByEmail(email: string) {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("User not found");
    }
    return admin;
  };
  signIn = async (email: string) => {
    let admin = await Admin.findOne({ email });
    
    if (!admin) {
      admin = await Admin.create({ email });
    }
  
    if (admin.isOTPLocked()) {
      const lockTime = admin.otpLockedUntil!;
      const minutesLeft = Math.ceil((lockTime.getTime() - Date.now()) / (1000 * 60));
      throwError(403, `Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`);
    }
  
    const otp = admin.generateOTP();
    await admin.save();
  
    await EmailService.sendOTP(email, otp); // Gửi email
  
    return {
      success: true,
      message: "OTP đã được gửi đến email của bạn",
      email,
    };
  };
  
  verifyEmail = async (email: string, otp: string) => {
    const admin = await Admin.findOne({ email });
    if (!admin) throw new Error("Email không tồn tại");

    if (admin.isOTPLocked()) {
      const lockTime = admin.otpLockedUntil!;
      const minutesLeft = Math.ceil(
        (lockTime.getTime() - Date.now()) / (1000 * 60)
      );
      throw new Error(
        `Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`
      );
    }

    if (!admin.otp || admin.otp.code !== otp) {
      admin.incrementOTPAttempts();
      await admin.save();
      throw new Error("Mã OTP không đúng");
    }

    if (admin.otp.expiresAt < new Date()) {
      throw new Error("Mã OTP đã hết hạn");
    }
    admin.otp = undefined;
    admin.isEmailVerified = true;
    admin.otpAttempts = 0;
    admin.otpLockedUntil = undefined;
    await admin.save();

    return {
      admin: {
        email: admin.email,
        isEmailVerified: admin.isEmailVerified,
      },
    };
  };

  findAll = async()=> {
    return await Admin.find();
  }
  findById = async(id:string)=> {
    return await Admin.findById(id);
  };
  updateProfile = async (adminId: string, data: any) => {
    const { name, phone, address, avatar, gender, birth } = data;
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId,
      { $set: {
          ...(name && { "info.name":name }),
          ...(phone && { "info.phone": phone }),
          ...(address && { "info.address": address }),
          ...(avatar && { "info.avatar": avatar }),
          ...(gender && { "info.gender": gender }),
          ...(birth && { "info.birth": birth }),
        }, 
      }, { new: true });
    return updatedAdmin;
  };
}
const adminAuthServices = new AdminAuthServices();
export default adminAuthServices;
