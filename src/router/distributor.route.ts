import express from "express";
import controller from "../controller/medicine/distributor.controller";
const router = express.Router();
router.post("/add-distributor", controller.addDistributor);
export default router;
