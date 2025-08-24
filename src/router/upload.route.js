"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const upload_controller_1 = __importDefault(require("../controller/upload.controller"));
const router = express_1.default.Router();
router.post("/single", upload_middleware_1.default.upload.single("image"), upload_controller_1.default.uploadSingle);
router.post("/multiple", upload_middleware_1.default.upload.array("image", 4), upload_controller_1.default.uploadMultiple);
router.post("/upload-precription", upload_middleware_1.default.upload.single("image"), upload_controller_1.default.uploadPrescription);
exports.default = router;
