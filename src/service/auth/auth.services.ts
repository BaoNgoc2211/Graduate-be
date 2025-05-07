import User from "../../model/auth/user.model";
import { EmailService } from "../auth/email.services";
import throwError from "../../util/create-error";
import authRepository from "../../repository/auth.repository";

class AuthServices {
  private async checkEmail(email: string) {
    if (await authRepository.findEmail(email)) {
      throwError(404, "Email is already exists");
    }
  }
  private async checkVerifyEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throwError(404, "User not found");
    }
    return user?.isEmailVerified;
  }
  private async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  findAll = async()=> {
    return await User.find();
  };

  signIn = async (email: string) => {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    if (user.isOTPLocked()) {
      const lockTime = user.otpLockedUntil!;
      const minutesLeft = Math.ceil(
        (lockTime.getTime() - Date.now()) / (1000 * 60)
      );
      throw new Error(
        `Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`
      );
    } else {
    }

    const otp = user.generateOTP();
    await user.save();
    EmailService.sendOTP(email, otp);

    return {
      success: true,
      message: "OTP đã được gửi đến email của bạn",
    };
  };
  verifyEmail = async (email: string, otp: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email không tồn tại");

    if (user.isOTPLocked()) {
      const lockTime = user.otpLockedUntil!;
      const minutesLeft = Math.ceil(
        (lockTime.getTime() - Date.now()) / (1000 * 60)
      );
      throw new Error(
        `Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`
      );
    }

    if (!user.otp || user.otp.code !== otp) {
      user.incrementOTPAttempts();
      await user.save();
      throw new Error("Mã OTP không đúng");
    }

    if (user.otp.expiresAt < new Date()) {
      throw new Error("Mã OTP đã hết hạn");
    }
    user.otp = undefined;
    user.isEmailVerified = true;
    user.otpAttempts = 0;
    user.otpLockedUntil = undefined;
    await user.save();

    return {
      user: {
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
    };
  };
  resendOTP = async (email: string) => {
    const user = await this.getUserByEmail(email);

    if (user.isEmailVerified) {
      throwError(400, "Email đã được xác minh");
    }

    if (user.isOTPLocked()) {
      const minutesLeft = Math.ceil(
        (user.otpLockedUntil!.getTime() - Date.now()) / 60000
      );
      throwError(
        403,
        `Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`
      );
    }

    if (user.otp && user.otp.expiresAt > new Date()) {
      throwError(
        400,
        "OTP hiện tại vẫn còn hiệu lực. Vui lòng kiểm tra email."
      );
    }

    const otp = user.generateOTP();
    await user.save();
    EmailService.sendOTP(email, otp);

    return {
      success: true,
      message: "OTP đã được gửi lại thành công.",
    };
  };
  validateOAuthLogin = async (profile: any) => {
    const existingUser = await authRepository.findByGoogleId(profile.id);
    if (existingUser) return existingUser;

    const newUser = await authRepository.createGoogleUser({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value,
    });

    return newUser;
  };
  updateProfile = async(userId:string, data:any) =>{
    const {name, phone, address, avatar,gender, birth} = data;
    const updateUser = await User.findByIdAndUpdate(userId,
      {
        $set:{
          ...(name && { "info.name":name }),
          ...(phone && { "info.phone": phone }),
          ...(address && { "info.address": address }),
          ...(avatar && { "info.avatar": avatar }),
          ...(gender && { "info.gender": gender }),
          ...(birth && { "info.birth": birth }),
        }, 
      },{new: true});
    return updateUser;
  };
  
}
const authServices = new AuthServices();
export default authServices;