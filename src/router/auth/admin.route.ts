import adminController from "../../controller/auth/admin.controller";
import express from "express";
import { adminOnly } from "../../middleware/admin.middleware";


const router = express.Router();

router.post("/sign-up", adminController.signUp);
router.post("/sign-in", adminController.signin);
// router.post("/", controller.signUp);
router.post("/verify-otp", adminController.verifyEmail);
router.post("/logout", adminOnly,adminController.logout);

router.get("/profile",adminOnly,adminController.findAdmin)
// router.put("/profile/:id",controller.);
router.put("/profile",adminOnly, adminController.updateProfile);

export default router;
