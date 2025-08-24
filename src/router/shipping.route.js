"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shipping_controller_1 = __importDefault(require("../controller/shipping.controller"));
const router = express_1.default.Router();
router.get("/", shipping_controller_1.default.getAllShipping);
router.get("/:id", shipping_controller_1.default.getShippingById);
router.post("/", shipping_controller_1.default.createShipping);
router.put("/:id", shipping_controller_1.default.updateShipping);
router.delete("/:id", shipping_controller_1.default.deleteShipping);
exports.default = router;
