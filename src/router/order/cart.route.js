"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = __importDefault(require("../../controller/order/cart.controller"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
router.get("/get-cart", auth_middleware_1.protect, cart_controller_1.default.getAll);
router.post("/add-item", auth_middleware_1.protect, cart_controller_1.default.addToCart);
router.patch("/update/", auth_middleware_1.protect, cart_controller_1.default.update);
router.delete("/remove", auth_middleware_1.protect, cart_controller_1.default.remove);
router.delete("/clear", auth_middleware_1.protect, cart_controller_1.default.clear);
exports.default = router;
