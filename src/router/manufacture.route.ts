import express from "express";
import controller from "../controller/medicine/manufacturer.controller";
const router = express.Router();
router.post("/add-manufacture", controller.addManufacturer);
export default router;
