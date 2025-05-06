import controller from "../controller/auth/auth.controller";
import express from "express";
import passport from 'passport';

// import authController from "../controller/auth.controller";

const router = express.Router();
// Đăng ký khách hàng
// router.post("/sign-up", authController.signUp);
// Đăng nhập khách hàng
// router.post("/sign-in", authController.signUp);
router.post("/sign-in", controller.signin);
router.post("/verify-otp", controller.verifyEmail);
router.post("/logout", controller.logout);
router.get("/",controller.findAll);

//Đăng nhập bằng google
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/auth/failure' }),
//   controller.loginSuccess
// );
router.get('/failure', controller.loginFailure);
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
