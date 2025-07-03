import authController from "../../controller/auth/auth.controller";
import express from "express";
import { protect } from "../../middleware/auth.middleware";

const router = express.Router();

// router.get("/:userId", authController.signUp);
router.post("/sign-up", authController.signUp);
router.post("/verify-otp", authController.verifyEmail);
router.post("/sign-in", authController.signin);
router.post("/logout", protect, authController.logout);
router.get("/check-auth", protect, authController.checkAuth);
router.get("/profile", authController.findAll);
router.put("/profile", protect, authController.updateInfo);
router.put("/forgot-password/:id", authController.forgotPassword);
router.put("/reset-password/:id", authController.resetPassword);

//Đăng nhập bằng google
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/auth/failure' }),
//   controller.loginSuccess
// );
router.get("/failure", authController.loginFailure);
// Cập nhật thông tin khách hàng
// router.put("/update/:userId", authController.signUp);
// Lấy thông tin khách hàng theo ID

// router.post('/logout',authController.logout);
// router.post('/forgot-password',validateRequest(forgotPasswordSchema), authController.forgotPassword);
// router.post('/reset-password',validateRequest(resetPasswordSchema), authController.resetPassword);
// router.get('/checkAuth',middleware.verifyToken,authController.checkAuth);
// router.get('/google', authController.googleAuth)
// router.get('/google/callback', authController.googleCallback);
export default router;
