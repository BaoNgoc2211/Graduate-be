"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const distributor_controller_1 = __importDefault(require("../../controller/stock/distributor.controller"));
const router = express_1.default.Router();
router.get("/", distributor_controller_1.default.getAllDistributor);
router.get("/:id", distributor_controller_1.default.getDistributorById);
router.post("/add-distributor", distributor_controller_1.default.addDistributor);
router.put("/update-distributor/:id", distributor_controller_1.default.updateDistributor);
router.delete("/delete-distributor/:id", distributor_controller_1.default.deleteDistributor);
exports.default = router;
