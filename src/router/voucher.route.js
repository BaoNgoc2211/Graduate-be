"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const voucher_controller_1 = __importDefault(require("../controller/voucher.controller"));
const router = express_1.default.Router();
router.post("/create-voucher", voucher_controller_1.default.addVoucher);
router.get("/getallvoucher", voucher_controller_1.default.getAll);
router.get("/getVoucher", voucher_controller_1.default.getValidVoucher);
router.put("/updatevoucher/:id", voucher_controller_1.default.updateVoucher);
router.delete("/deletevoucher/:id", voucher_controller_1.default.deleteVoucher);
exports.default = router;
