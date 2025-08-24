"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stock_controller_1 = __importDefault(require("../../controller/stock/stock.controller"));
const router = (0, express_1.Router)();
router.get("/", stock_controller_1.default.getAll);
router.get("/lowstock", stock_controller_1.default.getLowStock);
router.get("/medicine/:medicine_id", stock_controller_1.default.getStockByMedicineId);
router.post("/", stock_controller_1.default.create);
router.delete("/:id", stock_controller_1.default.delete);
exports.default = router;
