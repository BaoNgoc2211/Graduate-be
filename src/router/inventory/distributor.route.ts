import express from "express";
import distributorController from "../../controller/stock/distributor.controller";
const router = express.Router();
router.post("/add-distributor", distributorController.addDistributor);
export default router;
