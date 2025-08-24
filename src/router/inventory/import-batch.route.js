"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const import_batch_controller_1 = __importDefault(require("../../controller/stock/import-batch.controller"));
const router = express_1.default.Router();
router.get("/", import_batch_controller_1.default.getAllImportBatches);
router.get("/:id", import_batch_controller_1.default.getImportBatchById);
router.post("/add-import-batch", import_batch_controller_1.default.addDistributor);
router.put("/update-import-batch/:id", import_batch_controller_1.default.updateImportBatch);
router.put("/update-import-batch-status/:id", import_batch_controller_1.default.updateImportBatchStatus);
router.delete("/delete-import-batch/:id", import_batch_controller_1.default.deleteImportBatch);
exports.default = router;
