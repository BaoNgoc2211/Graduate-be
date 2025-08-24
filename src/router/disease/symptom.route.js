"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const symptom_controller_1 = __importDefault(require("../../controller/disease/symptom.controller"));
const router = express_1.default.Router();
router.post("/create", symptom_controller_1.default.create);
router.put("/update/:id", symptom_controller_1.default.update);
router.delete("/delete/:id", symptom_controller_1.default.delete);
exports.default = router;
