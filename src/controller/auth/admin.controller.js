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
const admin_auth_services_1 = __importDefault(require("../../service/auth/admin.auth.services"));
class AdminAuthController {
    constructor() {
        this.findAll = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const admins = yield admin_auth_services_1.default.getAllAdmin(page, limit);
            (0, response_1.returnRes)(res, 200, "Find All", admins);
        }));
        this.signUp = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield admin_auth_services_1.default.signUp(req.body);
            const accessToken = jwt_services_1.default.generateAdminJwt(res, data.id);
            (0, response_1.returnRes)(res, 201, "Sign up successful", accessToken);
        }));
        this.signin = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield admin_auth_services_1.default.signIn(req.body);
            const accessToken = jwt_services_1.default.generateAdminJwt(res, data);
            (0, response_1.returnRes)(res, 200, "Đăng nhập thành công", accessToken);
        }));
        // signin = asyncError(async (req: Request, res: Response) => {
        //   const { email } = req.body;
        //   await adminAuthServices.signIn(email);
        //   const accessToken = jwtServices.generateJwt;
        //   return returnRes(res, 200, "Send OTP successful");
        // });
        this.verifyEmail = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, otp } = req.body;
            yield admin_auth_services_1.default.verifyEmail(email, otp);
            (0, response_1.returnRes)(res, 200, "Verify email successful");
        }));
        this.logout = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            jwt_services_1.default.clearJwt(res);
            (0, response_1.returnRes)(res, 200, "Log out successful");
        }));
        // checkAuth = asyncError(async (req: Request, res: Response) => {
        //   const user = req.admin;
        //   returnRes(res, 200, "Check authentication successful", user);
        // });
        this.updateProfile = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const adminId = req.admin;
            const updated = yield admin_auth_services_1.default.updateProfile(String(adminId), req.body);
            if (!updated) {
                // Trả lỗi tại đây và return để kết thúc
                (0, response_1.returnRes)(res, 404, "Không tìm thấy admin");
            }
            (0, response_1.returnRes)(res, 200, "Cập nhật thông tin thành công", updated);
        }));
        this.findAdmin = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const adminId = req.admin;
            const admins = yield admin_auth_services_1.default.findById(String(adminId));
            if (!admins) {
                (0, response_1.returnRes)(res, 404, "User not found");
            }
            (0, response_1.returnRes)(res, 200, "Find All", admins);
        }));
    }
}
exports.default = new AdminAuthController();
