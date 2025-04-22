import User from "../model/user.model";
import { EmailService } from "./email.services";
import { IUser } from "../interface/user.interface";

export class AuthServices {
  static async sendOTP(email: string) {
    try {
      let user = await User.findOne({ email }) as IUser;

      if (!user) {
        user = await User.create({ email }) as IUser;
      }

      if (user.isOTPLocked()) {
        const lockTime = user.otpLockedUntil;
        const minutesLeft = Math.ceil(
          (lockTime!.getTime() - new Date().getTime()) / (1000 * 60)
        );
        throw new Error(
          `Tài khoản của bạn đã bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`
        );
      }

      const otp = user.generateOTP();
      await user.save();

      await EmailService.sendOTP(email, otp);

      return {
        success: true,
        message: "OTP đã được gửi đến email của bạn",
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to send OTP"
      );
    }
  }

  static async verifyOTP(email: string, otp: string) {
    try {
      const user = await User.findOne({ email }) as IUser;

      if (!user) {
        throw new Error("Email không tồn tại");
      }

      if (user.isOTPLocked()) {
        const lockTime = user.otpLockedUntil;
        const minutesLeft = Math.ceil(
          (lockTime!.getTime() - new Date().getTime()) / (1000 * 60)
        );
        throw new Error(
          `Tài khoản của bạn đã bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`
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
          name: user.name,
          isEmailVerified: user.isEmailVerified,
        },
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to verify OTP"
      );
    }
  }
}

const authServices = new AuthServices();
export default authServices;
