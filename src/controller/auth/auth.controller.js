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
const error_middleware_1 = __importDefault(require("../../middleware/error.middleware"));
const response_1 = require("../../util/response");
const jwt_services_1 = __importDefault(require("../../service/auth/jwt.services"));
const auth_services_1 = __importDefault(require("../../service/auth/auth.services"));
class AuthController {
    constructor() {
        //
        this.findAll = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const user = yield auth_services_1.default.getAllUser(page, limit);
            (0, response_1.returnRes)(res, 200, "Find All", user);
        }));
        this.signUp = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield auth_services_1.default.signUp(req.body);
            const accessToken = jwt_services_1.default.generateJwt(res, data.id);
            (0, response_1.returnRes)(res, 201, "Sign up successful", accessToken);
        }));
        this.verifyEmail = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, otp } = req.body;
            yield auth_services_1.default.verifyEmail(email, otp);
            (0, response_1.returnRes)(res, 200, "Verify email successful");
        }));
        this.signin = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield auth_services_1.default.signIn(req.body);
            const accessToken = jwt_services_1.default.generateJwt(res, data);
            (0, response_1.returnRes)(res, 200, "Đăng nhập thành công", accessToken);
        }));
        this.logout = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            jwt_services_1.default.clearJwt(res);
            (0, response_1.returnRes)(res, 200, "Log out successful");
        }));
        this.checkAuth = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            (0, response_1.returnRes)(res, 200, "Check authentication successful", user);
        }));
        this.getProfile = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const user = yield auth_services_1.default.getProfile(String(userId));
            if (!user) {
                (0, response_1.returnRes)(res, 404, "User not found");
            }
            (0, response_1.returnRes)(res, 200, "Get profile successful", user);
        }));
        // resendOTP = asyncError(async (req: Request, res: Response) => {
        //   const { email } = req.body;
        //   await authServices.resendOTP(email);
        //   returnRes(res, 200, "Resend OTP successful");
        // });
        this.forgotPassword = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const data = yield auth_services_1.default.forgotPassword(email);
            (0, response_1.returnRes)(res, 200, `OTP sent to ${data}`);
        }));
        this.resetPassword = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, otp, newPassword } = req.body;
            yield auth_services_1.default.resetPassword(email, otp, newPassword);
            (0, response_1.returnRes)(res, 200, "Reset password successful");
        }));
        this.updateInfo = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const updated = yield auth_services_1.default.updateProfile(String(userId), req.body);
            if (!updated)
                (0, response_1.returnRes)(res, 404, "Không tìm thấy user");
            (0, response_1.returnRes)(res, 200, "Cập nhật thành công", updated);
        }));
    }
    loginSuccess(req, res) {
        if (!req.user)
            return res.redirect("/login");
        res.json({ message: "Đăng nhập thành công", user: req.user });
    }
    loginFailure(req, res) {
        res.status(401).json({ message: "Đăng nhập thất bại" });
    }
}
exports.default = new AuthController();
