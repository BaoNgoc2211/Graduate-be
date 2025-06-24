import express from "express";
import distributorController from "../../controller/stock/distributor.controller";
const router = express.Router();

router.get("/",distributorController.getAllDistributor);
router.post("/add-distributor", distributorController.addDistributor);
router.put("/update-distributor/:id", distributorController.updateDistributor);
router.delete("/delete-distributor/:id", distributorController.deleteDistributor);

export default router;
