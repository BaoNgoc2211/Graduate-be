"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtServices {
    /**
     * Sinh accessToken và gắn vào cookie
     * @param res Express Response object
     * @param userId ID của user được mã hóa
     * @returns accessToken (chỉ để debug, không trả về FE)
     */
    generateJwt(res, userId) {
        const payload = {
            userId,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 2,
        });
        return accessToken;
    }
    generateAdminJwt(res, adminId) {
        const payload = { userId: adminId };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 2,
        });
        return token;
    }
    /**
    * Xóa accessToken khỏi cookie
    * @param res Express Response object
    */
    clearJwt(res) {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
    }
}
const jwtServices = new JwtServices();
exports.default = jwtServices;
