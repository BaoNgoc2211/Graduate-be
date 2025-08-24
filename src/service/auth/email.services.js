"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: config_1.default.email.user,
        pass: config_1.default.email.pass,
    },
});
class EmailService {
    static sendOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailOptions = {
                    from: config_1.default.email.user,
                    to: email,
                    subject: "Mã OTP đăng nhập",
                    html: `
            <h1>Mã OTP của bạn</h1>
            <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
            <p>Mã này sẽ hết hạn sau 10 phút.</p>
            <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
          `,
                };
                yield transporter.sendMail(mailOptions);
                return true;
            }
            catch (error) {
                console.error("Error sending email:", error);
                throw new Error("Failed to send OTP email");
            }
        });
    }
}
exports.EmailService = EmailService;
