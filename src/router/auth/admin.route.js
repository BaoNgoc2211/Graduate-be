"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = __importDefault(require("../../controller/auth/admin.controller"));
const express_1 = __importDefault(require("express"));
const admin_middleware_1 = require("../../middleware/admin.middleware");
const router = express_1.default.Router();
router.post("/sign-up", admin_controller_1.default.signUp);
router.post("/sign-in", admin_controller_1.default.signin);
// router.post("/", controller.signUp);
router.post("/verify-otp", admin_controller_1.default.verifyEmail);
router.get("/getalladmin", admin_controller_1.default.findAll);
router.post("/logout", admin_middleware_1.adminProtect, admin_controller_1.default.logout);
router.get("/profile", admin_middleware_1.adminProtect, admin_controller_1.default.findAdmin);
// router.put("/profile/:id",controller.);
router.put("/profile", admin_middleware_1.adminProtect, admin_controller_1.default.updateProfile);
// router.get("/getuser",requireAdminRole,authController.findAll)
exports.default = router;
