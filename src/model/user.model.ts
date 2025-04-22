import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interface/user.interface";

// Định nghĩa schema cho user
const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    default: null,
  },
  address: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  otp: {
    code: String,
    expiresAt: Date,
  },
  otpAttempts: {
    type: Number,
    default: 0,
  },
  otpLockedUntil: {
    type: Date,
    default: null,
  },
  password: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    default: null,
  },
  birth: {
    type: Date,
    default: null,
  },
  point: {
    type: Number,
    default: 0,
  },
}, { collection: "User", timestamps: true });

userSchema.methods.generateAuthToken = function() {
  const payload = { 
    _id: this._id.toString(), 
    email: this.email, 
    role: this.role 
  };
  return jwt.sign(payload, config.jwt.secret, { expiresIn: "7d" });
};

userSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Set thời gian hết hạn là 10 phút sau
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);
  
  // Lưu OTP vào user
  this.otp = {
    code: otp,
    expiresAt: expiresAt
  };
  
  // Reset số lần thử và thời gian khóa
  this.otpAttempts = 0;
  this.otpLockedUntil = undefined;
  
  return otp;
};

// Kiểm tra tài khoản có bị khóa không
userSchema.methods.isOTPLocked = function() {
  if (!this.otpLockedUntil) return false;
  return new Date() < this.otpLockedUntil;
};

// Tăng số lần thử OTP
userSchema.methods.incrementOTPAttempts = function() {
  this.otpAttempts += 1;
  if (this.otpAttempts >= 3) {
    // Khóa tài khoản trong 15 phút
    const lockUntil = new Date();
    lockUntil.setMinutes(lockUntil.getMinutes() + 15);
    this.otpLockedUntil = lockUntil;
  }
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
