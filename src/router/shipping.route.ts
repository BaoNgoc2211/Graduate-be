import express from "express";
import shippingController from "../controller/shipping.controller";

const router = express.Router();
router.get("/", shippingController.getAllShipping);
router.get("/:id", shippingController.getShippingById);
router.post("/", shippingController.createShipping);    
router.put("/:id", shippingController.updateShipping);
router.delete("/:id", shippingController.deleteShipping);

export default router;

