import express from "express";
import importBatchController from "../../controller/stock/import-batch.controller";
const router = express.Router();
router.post("/add-import-batch", importBatchController.addDistributor);
export default router;