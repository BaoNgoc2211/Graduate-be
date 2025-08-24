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
const admin_model_1 = __importDefault(require("../../model/auth/admin.model"));
const email_services_1 = require("../auth/email.services");
const create_error_1 = __importDefault(require("../../util/create-error"));
const bcrypt_1 = __importDefault(require("../../util/bcrypt"));
class AdminAuthServices {
    constructor() {
        this.signUp = (admin) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkEmail(admin.email);
            admin.password = yield bcrypt_1.default.Hash(admin.password);
            const newAdmin = yield admin_model_1.default.create(admin);
            const otp = newAdmin.generateOTP();
            yield newAdmin.save();
            email_services_1.EmailService.sendOTP(newAdmin.email, otp);
            return newAdmin;
        });
        this.signIn = (data) => __awaiter(this, void 0, void 0, function* () {
            const checkAdmin = yield this.getAdminByEmail(data.email);
            const checkPassword = yield bcrypt_1.default.Compare(data.password, checkAdmin.password);
            if (!checkPassword) {
                (0, create_error_1.default)(400, "Email hoặc mật khẩu không đúng");
            }
            return checkAdmin.id;
        });
        this.verifyEmail = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_model_1.default.findOne({ email });
            if (!admin)
                throw new Error("Email không tồn tại");
            if (admin.isOTPLocked()) {
                const lockTime = admin.otpLockedUntil;
                const minutesLeft = Math.ceil((lockTime.getTime() - Date.now()) / (1000 * 60));
                throw new Error(`Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`);
            }
            if (!admin.otp || admin.otp.code !== otp) {
                admin.incrementOTPAttempts();
                yield admin.save();
                throw new Error("Mã OTP không đúng");
            }
            if (admin.otp.expiresAt < new Date()) {
                throw new Error("Mã OTP đã hết hạn");
            }
            admin.otp = undefined;
            admin.isEmailVerified = true;
            admin.otpAttempts = 0;
            admin.otpLockedUntil = undefined;
            yield admin.save();
            return {
                admin: {
                    email: admin.email,
                    isEmailVerified: admin.isEmailVerified,
                },
            };
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield admin_model_1.default.findById(id);
        });
        this.updateProfile = (adminId, data) => __awaiter(this, void 0, void 0, function* () {
            const { name, phone, address, avatar, gender, birth } = data;
            const updatedAdmin = yield admin_model_1.default.findByIdAndUpdate(adminId, { $set: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { "info.name": name })), (phone && { "info.phone": phone })), (address && { "info.address": address })), (avatar && { "info.avatar": avatar })), (gender && { "info.gender": gender })), (birth && { "info.birth": birth })),
            }, { new: true });
            return updatedAdmin;
        });
    }
    getAllAdmin(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalItems = yield admin_model_1.default.countDocuments();
            const items = yield admin_model_1.default.find()
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
    findEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield admin_model_1.default.findOne({ email });
        });
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield adminAuthServices.findEmail(email)) {
                (0, create_error_1.default)(404, "Email is already exists");
            }
        });
    }
    checkVerifyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield admin_model_1.default.findOne({ email });
            if (!user) {
                (0, create_error_1.default)(404, "Admin not found");
            }
            return user === null || user === void 0 ? void 0 : user.isEmailVerified;
        });
    }
    getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_model_1.default.findOne({ email });
            if (!admin) {
                throw new Error("Admin not found");
            }
            return admin;
        });
    }
    ;
}
const adminAuthServices = new AdminAuthServices();
exports.default = adminAuthServices;
