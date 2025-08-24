"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// Định nghĩa schema cho user
const userSchema = new mongoose_1.default.Schema({
    googleId: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
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
    },
    info: {
        name: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
        },
        gender: {
            type: String,
        },
        birth: {
            type: Date,
        },
        point: {
            type: Number,
            default: 0,
        },
    },
}, { collection: "User", timestamps: true });
userSchema.methods.generateAuthToken = function () {
    const payload = {
        _id: this._id.toString(),
        email: this.email,
    };
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt.secret, { expiresIn: "7d" });
};
userSchema.methods.generateOTP = function () {
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
userSchema.methods.isOTPLocked = function () {
    if (!this.otpLockedUntil)
        return false;
    return new Date() < this.otpLockedUntil;
};
userSchema.methods.incrementOTPAttempts = function () {
    this.otpAttempts += 1;
    if (this.otpAttempts >= 3) {
        // Khóa tài khoản trong 15 phút
        const lockUntil = new Date();
        lockUntil.setMinutes(lockUntil.getMinutes() + 15);
        this.otpLockedUntil = lockUntil;
    }
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
