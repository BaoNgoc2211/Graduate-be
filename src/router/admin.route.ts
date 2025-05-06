import controller from "../controller/auth/admin.auth.controller";
import express from "express";


const router = express.Router();

router.post("/sign-in", controller.signin);
// router.post("/", controller.signUp);
router.post("/verify-otp", controller.verifyEmail);
router.post("/logout", controller.logout);

router.get("/profile",controller.findAll)
// router.put("/profile/:id",controller.);
router.put("/profile/:id", controller.updateProfile);

export default router;
