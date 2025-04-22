import express from "express";
import { AuthController } from "../controller/auth.controller";
// import authController from "../controller/auth.controller";

const router = express.Router();
// Đăng ký khách hàng
// router.post("/sign-up", authController.signUp);
// Đăng nhập khách hàng
// router.post("/sign-in", authController.signUp);
// Gửi OTP đến email khách hàng
router.post("/send-otp", AuthController.sendOTP);
// Xác thực OTP khách hàng
router.post("/verify-otp", AuthController.verifyOTP);
// Cập nhật thông tin khách hàng
// router.put("/update/:userId", authController.signUp);
// Lấy thông tin khách hàng theo ID
// router.get("/:userId", authController.signUp);
// router.post('/logout',authController.logout);
// router.post('/forgot-password',validateRequest(forgotPasswordSchema), authController.forgotPassword);
// router.post('/reset-password',validateRequest(resetPasswordSchema), authController.resetPassword);
// router.get('/checkAuth',middleware.verifyToken,authController.checkAuth);
// router.get('/google', authController.googleAuth)
// router.get('/google/callback', authController.googleCallback);
export default router;
