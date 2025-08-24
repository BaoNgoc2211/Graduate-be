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
// import  otpGenerator  from 'otp-generator';
// import otpGenerator from 'otp-generator';
const otp_repository_1 = __importDefault(require("../../repository/otp.repository"));
const auth_repository_1 = __importDefault(require("../../repository/auth.repository"));
const create_error_1 = __importDefault(require("../../util/create-error"));
class OtpServices {
    constructor() {
        // generateOTP = () => {
        //     return otpGenerator.generate(6, {
        //         lowerCaseAlphabets: false,
        //         upperCaseAlphabets: false,
        //         specialChars: false
        //     })
        // }
        this.findOTP = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            if (!(yield otp_repository_1.default.findOTP(email, otp))) {
                (0, create_error_1.default)(404, "OTP wrong or expired");
            }
        });
        this.saveOTP = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            return yield otp_repository_1.default.saveOTP(email, otp);
        });
        this.verifyOTP = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            yield this.findOTP(email, otp);
            yield otp_repository_1.default.deleteOTP(email);
            return yield auth_repository_1.default.verifyUser(email);
        });
    }
}
exports.default = new OtpServices();
