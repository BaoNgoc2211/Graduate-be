"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchase_order_controller_1 = __importDefault(require("../../controller/order/purchase-order.controller"));
const router = (0, express_1.Router)();
router.get("/", purchase_order_controller_1.default.getAll);
router.get("/:id", purchase_order_controller_1.default.getById);
router.post("/", purchase_order_controller_1.default.create);
router.put("/:id", purchase_order_controller_1.default.update);
router.delete("/:id", purchase_order_controller_1.default.delete);
exports.default = router;
