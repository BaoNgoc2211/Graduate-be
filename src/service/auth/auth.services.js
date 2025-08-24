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
const user_model_1 = __importDefault(require("../../model/auth/user.model"));
const email_services_1 = require("../auth/email.services");
const create_error_1 = __importDefault(require("../../util/create-error"));
const auth_repository_1 = __importDefault(require("../../repository/auth.repository"));
const bcrypt_1 = __importDefault(require("../../util/bcrypt"));
class AuthServices {
    constructor() {
        // private async comparePassword(password: string, hashPassword: string) {
        //   if (!(await bcrypt.Compare(password, hashPassword))) {
        //     throwError(400, "Email or password wrong");
        //   }
        // }
        // signUp = async (user: IUser) => {
        //   await this.checkEmail(user.email);
        //   user.password = await bcrypt.Hash(user.password!);
        //   this.otpInvoker.setCommand(new GenerateOTP(user.email));
        //   this.otpInvoker.setCommand(new sendOTP(user.email));
        //   await this.otpInvoker.executeCommand();
        //   return await authRepository.createUser(user);
        // };
        this.getProfile = (userId) => __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findById(userId).select("info");
        });
        this.signUp = (user) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkEmail(user.email);
            user.password = yield bcrypt_1.default.Hash(user.password);
            const newUser = yield user_model_1.default.create(user);
            const otp = newUser.generateOTP();
            yield newUser.save();
            email_services_1.EmailService.sendOTP(newUser.email, otp);
            return newUser;
        });
        // signin
        this.signIn = (data) => __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield this.getUserByEmail(data.email);
            if (!checkUser) {
                (0, create_error_1.default)(400, "Email hoặc mật khẩu không đúng");
                return;
            }
            const checkPassword = yield bcrypt_1.default.Compare(data.password, checkUser.password);
            if (!checkPassword) {
                (0, create_error_1.default)(400, "Email hoặc mật khẩu không đúng");
            }
            return checkUser.id;
        });
        this.verifyEmail = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email: email });
            if (!user)
                throw new Error("Email không tồn tại");
            if (user.isOTPLocked()) {
                const lockTime = user.otpLockedUntil;
                const minutesLeft = Math.ceil((lockTime.getTime() - Date.now()) / (1000 * 60));
                throw new Error(`Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`);
            }
            if (!user.otp || user.otp.code !== otp) {
                user.incrementOTPAttempts();
                yield user.save();
                throw new Error("Mã OTP không đúng");
            }
            if (user.otp.expiresAt < new Date()) {
                throw new Error("Mã OTP đã hết hạn");
            }
            user.otp = undefined;
            user.isEmailVerified = true;
            user.otpAttempts = 0;
            user.otpLockedUntil = undefined;
            yield user.save();
            return {
                user: {
                    email: user.email,
                    isEmailVerified: user.isEmailVerified,
                },
            };
        });
        // resendOTP = async (email: string) => {
        //   const user = await this.getUserByEmail(email);
        //   if (user.isEmailVerified) {
        //     throwError(400, "Email đã được xác minh");
        //   }
        //   if (user.isOTPLocked()) {
        //     const minutesLeft = Math.ceil(
        //       (user.otpLockedUntil!.getTime() - Date.now()) / 60000
        //     );
        //     throwError(
        //       403,
        //       `Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`
        //     );
        //   }
        //   if (user.otp && user.otp.expiresAt > new Date()) {
        //     throwError(
        //       400,
        //       "OTP hiện tại vẫn còn hiệu lực. Vui lòng kiểm tra email."
        //     );
        //   }
        //   const otp = user.generateOTP();
        //   await user.save();
        //   EmailService.sendOTP(email, otp);
        //   return {
        //     success: true,
        //     message: "OTP đã được gửi lại thành công.",
        //   };
        // };
        // validateOAuthLogin = async (profile: any) => {
        //   const existingUser = await authRepository.findByGoogleId(profile.id);
        //   if (existingUser) return existingUser;
        //   const newUser = await authRepository.createGoogleUser({
        //     googleId: profile.id,
        //     // name: profile.displayName,
        //     email: profile.emails?.[0]?.value,
        //   });
        //   return newUser;
        // };
        //   const validateOAuthLogin = async (profile: GoogleProfile): Promise<IUser> => {
        //   const existingUser = await authRepository.findByGoogleId(profile.id);
        //   if (existingUser) return existingUser;
        //   const email = profile.emails?.[0]?.value;
        //   if (!email) {
        //     throw new Error('Google profile does not contain email');
        //   }
        //   const newUser = await authRepository.createGoogleUser({
        //     googleId: profile.id,
        //     email,
        //     name: profile.displayName,
        //   });
        //   return newUser;
        // };
        // resendOTP = async (email: string) => {
        //   if (await this.checkVerifyUser(email)) {
        //     throwError(400, "Email has already been verify");
        //   }
        //   this.otpInvoker.setCommand(new ResendOTP(email));
        //   return this.otpInvoker.executeCommand();
        // };
        // forgotPassword = async (email: string) => {
        //   await this.getUserByEmail(email);
        //   const otp = otpServices.generateOTP();
        //   await otpServices.saveOTP(email, otp);
        //   mailServices.sendForgotPasswordEmail(email, otp);
        // };
        // resetPassword = async (email: string, otp: string, newPassword: string) => {
        //   await otpServices.findOTP(email, otp);
        //   await authRepository.updatePassword(email, await bcrypt.Hash(newPassword));
        //   await otpRepository.deleteOTP(email);
        // };
        this.forgotPassword = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(email);
            if (user.isOTPLocked()) {
                const lockTime = user.otpLockedUntil;
                const minutesLeft = Math.ceil((lockTime.getTime() - Date.now()) / (1000 * 60));
                (0, create_error_1.default)(403, `Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`);
            }
            user.generateOTP();
            yield user.save();
            // EmailService.sendForgotPasswordEmail(email, otp);
            return {
                success: true,
                message: "OTP đặt lại mật khẩu đã được gửi thành công.",
            };
        });
        this.resetPassword = (email, otp, newPassword) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(email);
            if (user.isOTPLocked()) {
                const lockTime = user.otpLockedUntil;
                const minutesLeft = Math.ceil((lockTime.getTime() - Date.now()) / (1000 * 60));
                (0, create_error_1.default)(403, `Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`);
            }
            if (!user.otp || user.otp.code !== otp) {
                user.incrementOTPAttempts();
                yield user.save();
                (0, create_error_1.default)(400, "Mã OTP không đúng");
            }
            if (user.otp.expiresAt < new Date()) {
                (0, create_error_1.default)(400, "Mã OTP đã hết hạn");
            }
            if (user.otp.expiresAt < new Date()) {
                user.password = yield bcrypt_1.default.Hash(newPassword);
                user.otp = undefined;
                user.otpAttempts = 0;
                user.otpLockedUntil = undefined;
                yield user.save();
                return {
                    success: true,
                    message: "Mật khẩu đã được đặt lại thành công.",
                };
            }
        });
        // auth.services.ts
        this.updateProfile = (userId, data) => __awaiter(this, void 0, void 0, function* () {
            // const { name, phone, avatar, gender, birthday, address } = data;
            return yield user_model_1.default.findByIdAndUpdate(userId, {
                $set: {
                    "info.name": data.name,
                    "info.phone": data.phone,
                    "info.avatar": data.avatar,
                    "info.gender": data.gender,
                    "info.birthday": data.birthday ? new Date(data.birthday) : undefined,
                    "info.address": data.address,
                },
            }, { new: true });
        });
    }
    getAllUser(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalItems = yield user_model_1.default.countDocuments();
            const items = yield user_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .select("email")
                .select("info.name");
            return {
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
                limit,
                data: items,
            };
        });
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield auth_repository_1.default.findEmail(email)) {
                (0, create_error_1.default)(404, "Email is already exists");
            }
        });
    }
    checkVerifyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                (0, create_error_1.default)(404, "Email chưa tạo tài khoản hoặc không tồn tại");
            }
            return user === null || user === void 0 ? void 0 : user.isEmailVerified;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                (0, create_error_1.default)(404, "User không tồn tại");
            }
            return user;
        });
    }
}
const authServices = new AuthServices();
exports.default = authServices;
