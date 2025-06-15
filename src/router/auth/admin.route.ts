import adminController from "../../controller/auth/admin.controller";
import express from "express";


const router = express.Router();

router.post("/sign-in", adminController.signin);
// router.post("/", controller.signUp);
router.post("/verify-otp", adminController.verifyEmail);
router.post("/logout", adminController.logout);

router.get("/profile",adminController.findAll)
// router.put("/profile/:id",controller.);
router.put("/profile/:id", adminController.updateProfile);

export default router;
