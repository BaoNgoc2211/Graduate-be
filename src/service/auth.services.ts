import User from "../model/user.model";
import { EmailService } from "./email.services";
import throwError from "../util/create-error";
import authRepository from "../repository/auth.repository";
// export class AuthServices {
//   static async signIn(email: string) {
//     try {
//       let user = (await User.findOne({ email })) as IUser;

//       if (!user) {
//         user = (await User.create({ email })) as IUser;
//       }

//       if (user.isOTPLocked()) {
//         const lockTime = user.otpLockedUntil;
//         const minutesLeft = Math.ceil(
//           (lockTime!.getTime() - new Date().getTime()) / (1000 * 60)
//         );
//         throw new Error(
//           `Tài khoản của bạn đã bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`
//         );
//       }

//       const otp = user.generateOTP();
//       await user.save();

//       EmailService.sendOTP(email, otp);

//       return {
//         success: true,
//         message: "OTP đã được gửi đến email của bạn",
//       };
//     } catch (error) {
//       throw new Error(
//         error instanceof Error ? error.message : "Failed to send OTP"
//       );
//     }
//   }

//   static async verifyEmail(email: string, otp: string) {
//     try {
//       const user = (await User.findOne({ email })) as IUser;

//       if (!user) {
//         throw new Error("Email không tồn tại");
//       }

//       if (user.isOTPLocked()) {
//         const lockTime = user.otpLockedUntil;
//         const minutesLeft = Math.ceil(
//           (lockTime!.getTime() - new Date().getTime()) / (1000 * 60)
//         );
//         throw new Error(
//           `Tài khoản của bạn đã bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`
//         );
//       }

//       if (!user.otp || user.otp.code !== otp) {
//         user.incrementOTPAttempts();
//         await user.save();
//         throw new Error("Mã OTP không đúng");
//       }

//       if (user.otp.expiresAt < new Date()) {
//         throw new Error("Mã OTP đã hết hạn");
//       }

//       user.otp = undefined;
//       user.isEmailVerified = true;
//       user.otpAttempts = 0;
//       user.otpLockedUntil = undefined;
//       await user.save();

//       return {
//         user: {
//           email: user.email,
//           isEmailVerified: user.isEmailVerified,
//         },
//       };
//     } catch (error) {
//       throw new Error(
//         error instanceof Error ? error.message : "Failed to verify OTP"
//       );
//     }
//   }
// }

// const authServices = new AuthServices();
// export default authServices;
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
  
  signIn = async (email: string) => {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    if (user.isOTPLocked()) {
      const lockTime = user.otpLockedUntil!;
      const minutesLeft = Math.ceil((lockTime.getTime() - Date.now()) / (1000 * 60));
      throw new Error(`Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`);
    }
    else{
      
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
      const minutesLeft = Math.ceil((lockTime.getTime() - Date.now()) / (1000 * 60));
      throw new Error(`Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`);
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
      const minutesLeft = Math.ceil((user.otpLockedUntil!.getTime() - Date.now()) / 60000);
      throwError(403, `Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`);
    }
  
    if (user.otp && user.otp.expiresAt > new Date()) {
      throwError(400, "OTP hiện tại vẫn còn hiệu lực. Vui lòng kiểm tra email.");
    }
  
    const otp = user.generateOTP();
    await user.save();
    EmailService.sendOTP(email, otp);
  
    return {
      success: true,
      message: "OTP đã được gửi lại thành công.",
    };
  };
}
  const authServices = new AuthServices();
  export default authServices
  // signIn = async (email: string) => {
  //   const user = await this.getUserByEmail(email);
  //   return user.id;
  // };
  // verifyEmail = async (email: string, otp: string) => {
  //   this.otpInvoker.setCommand(new VerifyOTP(email, otp));
  //   return this.otpInvoker.executeCommand();
  // };
  // resendOTP = async (email: string) => {
  //   if (await this.checkVerifyEmail(email)) {
  //     throwError(400, "Email has already been verify");
  //   }
  //   this.otpInvoker.setCommand(new ResendOTP(email));
  //   return this.otpInvoker.executeCommand();
  // };
