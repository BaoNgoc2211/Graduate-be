import controller from "./../controller/admin.auth.controller";
import express from "express";


const router = express.Router();

router.post("/sign-in", controller.signin);
router.post("/verify-otp", controller.verifyEmail);
router.post("/logout", controller.logout);

export default router;
