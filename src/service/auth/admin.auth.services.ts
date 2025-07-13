import Admin from "../../model/auth/admin.model";
import { EmailService } from "../auth/email.services";
import throwError from "../../util/create-error";
import authRepository from "../../repository/auth.repository";
import { IAdmin } from "../../interface/auth/admin.interface";
import bcrypt from "../../util/bcrypt";

class AdminAuthServices {
  async findEmail(email: string) {
    return await Admin.findOne({ email });
  }
  private async checkEmail(email: string) {
    if (await adminAuthServices.findEmail(email)) {
      throwError(404, "Email is already exists");
    }
  }
  private async checkVerifyEmail(email: string) {
    const user = await Admin.findOne({ email });
    if (!user) {
      throwError(404, "Admin not found");
    }
    return user?.isEmailVerified;
  }
  private async getAdminByEmail(email: string) {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Admin not found");
    }
    return admin;
  };

  signUp = async (admin: IAdmin) => {
    await this.checkEmail(admin.email);
    admin.password = await bcrypt.Hash(admin.password!);
    const newAdmin = await Admin.create(admin);
    const otp = newAdmin.generateOTP();
    await newAdmin.save();
    EmailService.sendOTP(newAdmin.email, otp);
    return newAdmin;
  };
  signIn = async (data: { email: string; password: string }) => {
    const checkAdmin = await this.getAdminByEmail(data.email);
    const checkPassword = await bcrypt.Compare(
      data.password,
      checkAdmin.password
    );
    if (!checkPassword) {
      throwError(400, "Email hoặc mật khẩu không đúng");
    }
    return checkAdmin!.id;
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
