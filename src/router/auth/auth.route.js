"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../../controller/auth/auth.controller"));
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
// router.get("/:userId", authController.signUp);
router.post("/sign-up", auth_controller_1.default.signUp);
router.post("/verify-otp", auth_controller_1.default.verifyEmail);
router.post("/sign-in", auth_controller_1.default.signin);
router.post("/logout", auth_middleware_1.protect, auth_controller_1.default.logout);
router.get("/check-auth", auth_middleware_1.protect, auth_controller_1.default.checkAuth);
router.get("/getalluser", auth_controller_1.default.findAll);
router.get("/profile", auth_middleware_1.protect, auth_controller_1.default.getProfile);
router.put("/profile", auth_middleware_1.protect, auth_controller_1.default.updateInfo);
router.put("/forgot-password/:id", auth_controller_1.default.forgotPassword);
router.put("/reset-password/:id", auth_controller_1.default.resetPassword);
//Đăng nhập bằng google
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/auth/failure' }),
//   controller.loginSuccess
// );
router.get("/failure", auth_controller_1.default.loginFailure);
// Cập nhật thông tin khách hàng
// router.put("/update/:userId", authController.signUp);
// Lấy thông tin khách hàng theo ID
// router.post('/logout',authController.logout);
// router.post('/forgot-password',validateRequest(forgotPasswordSchema), authController.forgotPassword);
// router.post('/reset-password',validateRequest(resetPasswordSchema), authController.resetPassword);
// router.get('/checkAuth',middleware.verifyToken,authController.checkAuth);
// router.get('/google', authController.googleAuth)
// router.get('/google/callback', authController.googleCallback);
exports.default = router;
