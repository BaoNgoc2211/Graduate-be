import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config";
import { IAdmin } from "../interface/admin.interface";

// Định nghĩa schema cho user
const adminSchema = new mongoose.Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
      lowercase: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
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
    info: {
      name: {
        type: String,
        trim: true,
        default: null,
      },
      phone: {
        type: String,
        trim: true,
        default: null,
      },
      address: {
        type: String,
        trim: true,
        default: null,
      },
      avatar: {
        type: String,
        default: null,
      },
      gender: {
        type: String,
        default: null,
      },
      birth: {
        type: Date,
        default: null,
      },
    },
  },
  { collection: "Admin", timestamps: true }
);
adminSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id.toString(),
    email: this.email,
  };
  return jwt.sign(payload, config.jwt.secret, { expiresIn: "7d" });
};

adminSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  this.otp = {
    code: otp,
    expiresAt: expiresAt,
  };

  // Reset số lần thử và thời gian khóa
  this.otpAttempts = 0;
  this.otpLockedUntil = undefined;

  return otp;
};

adminSchema.methods.isOTPLocked = function () {
  if (!this.otpLockedUntil) return false;
  return new Date() < this.otpLockedUntil;
};

adminSchema.methods.incrementOTPAttempts = function () {
  this.otpAttempts += 1;
  if (this.otpAttempts >= 3) {
    // Khóa tài khoản trong 15 phút
    const lockUntil = new Date();
    lockUntil.setMinutes(lockUntil.getMinutes() + 15);
    this.otpLockedUntil = lockUntil;
  }
};
const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
