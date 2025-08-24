"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// Định nghĩa schema cho user
const adminSchema = new mongoose_1.default.Schema({
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
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "staff"
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
    },
}, { collection: "Admin", timestamps: true });
adminSchema.methods.generateAuthToken = function () {
    const payload = {
        _id: this._id.toString(),
        email: this.email,
    };
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt.secret, { expiresIn: "7d" });
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
    if (!this.otpLockedUntil)
        return false;
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
const Admin = mongoose_1.default.model("Admin", adminSchema);
exports.default = Admin;
