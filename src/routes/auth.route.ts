import { Router } from "express";
import AuthController from "../controller/auth.controller";

const router = Router();

// Route gửi OTP
router.post("/send-otp", AuthController.sendOTP);

// Route xác thực OTP
router.post("/verify-otp", AuthController.verifyEmail);

// Route đăng xuất
router.post("/logout", AuthController.logout);

export default router; 