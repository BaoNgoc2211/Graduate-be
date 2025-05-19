import express from "express";
import controller from "../controller/medicine/import-batch.controller";
const router = express.Router();
router.post("/add-import-batch", controller.addDistributor);
export default router;