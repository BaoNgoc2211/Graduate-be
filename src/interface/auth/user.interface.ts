import mongoose, { Document } from "mongoose";
import { genderType } from "../../enum/user.enum";

export interface IUser extends Document {
  googleId?: string;
  email: string;
  password: string;
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
  info: {
    name?: string;
    phone?: string;
    avatar?: string;
    gender?: genderType;
    point?: number;
    birthday?: Date;
    address?: {
      provinceId: string;
      provinceName: string;
      wardId: string;
      wardName: string;
      street?: string;
    };
  };
}
export interface IUserInfo{
  name?: string;
  phone?: string;
  avatar?: string;
  gender?: genderType;
  point?: number;
  birthday?: Date;
  address?: {
    provinceId: string;
    provinceName: string;
    wardId: string;
    wardName: string;
    street?: string;
  };
}

export interface IAuthAction {
  generateAuthToken(): string;
  generateOTP(): string;
  isOTPLocked(): boolean;
  incrementOTPAttempts(): void;
}
export type UserModel = mongoose.Model<IUser>;
