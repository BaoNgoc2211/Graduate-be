import mongoose, { Document } from "mongoose";
import { genderType } from "../../enum/user.enum";

export interface IAdmin extends Document {
  email: string;
  isEmailVerified: boolean;
  password:string;
  otp?: {
    code: string;
    expiresAt: Date;
  };
  role:string,
  otpAttempts: number;
  otpLockedUntil?: Date;
  generateAuthToken(): string;
  generateOTP(): string;
  isOTPLocked(): boolean;
  incrementOTPAttempts(): void;
  info:{
    name?: string;
    phone?: string;
    address?: string;
    avatar?: string;
    gender?: genderType;
    birth?: Date;
  }
}
export type AdminModel = mongoose.Model<IAdmin>;
