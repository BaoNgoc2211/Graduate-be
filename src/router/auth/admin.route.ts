import adminController from "../../controller/auth/admin.controller";
import express from "express";
import { adminProtect,requireAdminRole } from "../../middleware/admin.middleware";
import authController from "../../controller/auth/auth.controller";


const router = express.Router();

router.post("/sign-up", adminController.signUp);
router.post("/sign-in", adminController.signin);
// router.post("/", controller.signUp);
router.post("/verify-otp", adminController.verifyEmail);



router.post("/logout", adminProtect,adminController.logout);

router.get("/profile",adminProtect,adminController.findAdmin)
// router.put("/profile/:id",controller.);
router.put("/profile",adminProtect, adminController.updateProfile);


// router.get("/getuser",requireAdminRole,authController.findAll)

export default router;
