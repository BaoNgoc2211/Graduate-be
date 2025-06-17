import User from "../../model/auth/user.model";
import { EmailService } from "../auth/email.services";
import throwError from "../../util/create-error";
import authRepository from "../../repository/auth.repository";
import { IUser } from "../../interface/auth/user.interface";
import bcrypt from "../../util/bcrypt";
import { use } from "passport";

class AuthServices {
  private async checkEmail(email: string) {
    if (await authRepository.findEmail(email)) {
      throwError(404, "Email is already exists");
    }
  }
  private async checkVerifyEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throwError(404, "Email chưa tạo tài khoản hoặc không tồn tại");
    }
    return user?.isEmailVerified;
  }
  private async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throwError(404, "User không tồn tại");
    }
    return user;
  }
  // private async comparePassword(password: string, hashPassword: string) {
  //   if (!(await bcrypt.Compare(password, hashPassword))) {
  //     throwError(400, "Email or password wrong");
  //   }
  // }
  // signUp = async (user: IUser) => {
  //   await this.checkEmail(user.email);
  //   user.password = await bcrypt.Hash(user.password!);
  //   this.otpInvoker.setCommand(new GenerateOTP(user.email));
  //   this.otpInvoker.setCommand(new sendOTP(user.email));
  //   await this.otpInvoker.executeCommand();
  //   return await authRepository.createUser(user);
  // };

  findAll = async () => {
    return await User.find();
  };

  signUp = async (user: IUser) => {
    await this.checkEmail(user.email);
    user.password = await bcrypt.Hash(user.password!);
    const newUser = await User.create(user);
    const otp = newUser.generateOTP();
    await newUser.save();
    EmailService.sendOTP(newUser.email, otp);
    return newUser;
  };
  // signin
  signIn = async (data: { email: string; password: string }) => {
    const checkUser = await this.getUserByEmail(data.email);
    console.log(checkUser!.id);
    const checkPassword = await bcrypt.Compare(
      data.password,
      checkUser?.password!
    );
    if (!checkPassword) {
      throwError(400, "Email hoặc mật khẩu không đúng");
    }
    return checkUser!.id;
  };
  verifyEmail = async (email: string, otp: string) => {
    const user = await User.findOne({ email: email });
    console.log(user);
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
  // resendOTP = async (email: string) => {
  //   const user = await this.getUserByEmail(email);

  //   if (user.isEmailVerified) {
  //     throwError(400, "Email đã được xác minh");
  //   }

  //   if (user.isOTPLocked()) {
  //     const minutesLeft = Math.ceil(
  //       (user.otpLockedUntil!.getTime() - Date.now()) / 60000
  //     );
  //     throwError(
  //       403,
  //       `Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`
  //     );
  //   }

  //   if (user.otp && user.otp.expiresAt > new Date()) {
  //     throwError(
  //       400,
  //       "OTP hiện tại vẫn còn hiệu lực. Vui lòng kiểm tra email."
  //     );
  //   }

  //   const otp = user.generateOTP();
  //   await user.save();
  //   EmailService.sendOTP(email, otp);

  //   return {
  //     success: true,
  //     message: "OTP đã được gửi lại thành công.",
  //   };
  // };
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
  // resendOTP = async (email: string) => {
  //   if (await this.checkVerifyUser(email)) {
  //     throwError(400, "Email has already been verify");
  //   }
  //   this.otpInvoker.setCommand(new ResendOTP(email));
  //   return this.otpInvoker.executeCommand();
  // };

  // forgotPassword = async (email: string) => {
  //   await this.getUserByEmail(email);
  //   const otp = otpServices.generateOTP();
  //   await otpServices.saveOTP(email, otp);
  //   mailServices.sendForgotPasswordEmail(email, otp);
  // };

  // resetPassword = async (email: string, otp: string, newPassword: string) => {
  //   await otpServices.findOTP(email, otp);
  //   await authRepository.updatePassword(email, await bcrypt.Hash(newPassword));
  //   await otpRepository.deleteOTP(email);
  // };
  updateProfile = async (userId: string, data: any) => {
    const { name, phone, address, avatar, gender, birth } = data;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(name && { "info.name": name }),
          ...(phone && { "info.phone": phone }),
          ...(address && { "info.address": address }),
          ...(avatar && { "info.avatar": avatar }),
          ...(gender && { "info.gender": gender }),
          ...(birth && { "info.birth": birth }),
        },
      },
      { new: true }
    );
    return updateUser;
  };
}
const authServices = new AuthServices();
export default authServices;
