"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const disease_category_controller_1 = __importDefault(require("../../controller/disease/disease-category.controller"));
const router = express_1.default.Router();
router.get("/getAll", disease_category_controller_1.default.getAll);
router.get("/:id", disease_category_controller_1.default.getById);
router.post("/create", disease_category_controller_1.default.create);
router.put("/update/:id", disease_category_controller_1.default.update);
router.delete("/delete/:id", disease_category_controller_1.default.delete);
exports.default = router;
