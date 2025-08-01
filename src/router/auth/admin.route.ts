import adminController from "../../controller/auth/admin.controller";
import express from "express";
import { adminProtect } from "../../middleware/admin.middleware";



const router = express.Router();

router.post("/sign-up", adminController.signUp);
router.post("/sign-in", adminController.signin);
// router.post("/", controller.signUp);
router.post("/verify-otp", adminController.verifyEmail);
router.get("/getalladmin", adminController.findAll);


router.post("/logout", adminProtect,adminController.logout);

router.get("/profile",adminProtect,adminController.findAdmin)
// router.put("/profile/:id",controller.);
router.put("/profile",adminProtect, adminController.updateProfile);



// router.get("/getuser",requireAdminRole,authController.findAll)

export default router;
