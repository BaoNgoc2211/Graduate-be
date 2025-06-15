import express from "express";
import manufacturerController from "../../controller/stock/manufacturer.controller";
const router = express.Router();
router.post("/add-manufacture", manufacturerController.addManufacturer);
export default router;
