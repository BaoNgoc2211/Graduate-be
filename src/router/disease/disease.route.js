"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const disease_controller_1 = __importDefault(require("../../controller/disease/disease.controller"));
const router = express_1.default.Router();
router.get("/", disease_controller_1.default.getAllDiseases);
router.get("/detail/:id", disease_controller_1.default.getDetail);
router.post("/create", disease_controller_1.default.create);
router.put("/update/:id", disease_controller_1.default.update);
router.delete("/delete/:id", disease_controller_1.default.delete);
exports.default = router;
