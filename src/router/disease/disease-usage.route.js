"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const disease_usage_controller_1 = __importDefault(require("../../controller/disease/disease-usage.controller"));
const router = express_1.default.Router();
router.post("/create", disease_usage_controller_1.default.create);
router.put("/update/:id", disease_usage_controller_1.default.update);
router.delete("/delete/:id", disease_usage_controller_1.default.delete);
router.get("/get-all", disease_usage_controller_1.default.getAll);
exports.default = router;
