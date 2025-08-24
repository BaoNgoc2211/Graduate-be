"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manufacturer_controller_1 = __importDefault(require("../../controller/stock/manufacturer.controller"));
const router = express_1.default.Router();
router.get("/", manufacturer_controller_1.default.getAllManufacturers);
router.get("/:id", manufacturer_controller_1.default.getManufacturerById);
router.post("/add-manufacture", manufacturer_controller_1.default.addManufacturer);
router.put("/update-manufacture/:id", manufacturer_controller_1.default.updateManufacturer);
router.delete("/delete-manufacture/:id", manufacturer_controller_1.default.deleteManufacturer);
exports.default = router;
