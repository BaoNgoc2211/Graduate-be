import express from "express";
import importBatchController from "../../controller/stock/import-batch.controller";
const router = express.Router();

router.get("/", importBatchController.getAllImportBatches);
router.get("/:id", importBatchController.getImportBatchById);
router.post("/add-import-batch", importBatchController.addDistributor);
router.put("/update-import-batch/:id", importBatchController.updateImportBatch);
router.put("/update-import-batch-status/:id", importBatchController.updateImportBatchStatus);
router.delete("/delete-import-batch/:id", importBatchController.deleteImportBatch);

export default router;