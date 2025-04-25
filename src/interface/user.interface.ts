import mongoose, { Document } from "mongoose";
import { genderType } from "../enum/user.enum";

export interface IUser extends Document {
  email: string;
  name?: string;
  isEmailVerified: boolean;
  otp?: {
    code: string;
    expiresAt: Date;
  };
  otpAttempts: number;
  otpLockedUntil?: Date;
  generateAuthToken(): string;
  generateOTP(): string;
  isOTPLocked(): boolean;
  incrementOTPAttempts(): void;
}
export interface IUpdateProfileDto extends Document {
  email: string;
  name: string;
  phone?: string;
  address?: string;
  avatar?: string;
  gender?: genderType;
  birth?: Date;
  point: number;
}
// export interface IAuthAction {
//   generateAuthToken(): string;
//   generateOTP(): string;
//   isOTPLocked(): boolean;
//   incrementOTPAttempts(): void;
// }
export type UserModel = mongoose.Model<IUser>;
