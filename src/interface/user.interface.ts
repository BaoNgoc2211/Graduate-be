import mongoose, { Document } from "mongoose";
import { genderType } from "../enum/user.enum";

export interface IUser extends Document {
  email: string;
  name: string;
  phone?: string;
  address?: string;
  avatar?: string;
  isEmailVerified: boolean;
  role: 'user' | 'admin';
  otp?: {
    code: string;
    expiresAt: Date;
  };
  otpAttempts: number;
  otpLockedUntil?: Date;
  password?: string;
  gender?: string;
  birth?: Date;
  point: number;
  generateAuthToken(): string;
  generateOTP(): string;
  isOTPLocked(): boolean;
  incrementOTPAttempts(): void;
}

export type UserModel = mongoose.Model<IUser>;
