"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stock_controller_1 = __importDefault(require("../../controller/stock/stock.controller"));
// import stockController from "../controller/stock/stock.controller";
const router = (0, express_1.Router)();
router.post("/", stock_controller_1.default.create);
router.get("/", stock_controller_1.default.getAll);
// router.put("/:id", stockController.update);
router.delete("/:id", stock_controller_1.default.delete);
router.get("/lowstock", stock_controller_1.default.getLowStock);
router.get("/medicine/:id", stock_controller_1.default.getStockByMedicineId);
exports.default = router;
