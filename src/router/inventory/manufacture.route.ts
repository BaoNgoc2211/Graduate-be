import express from "express";
import manufacturerController from "../../controller/stock/manufacturer.controller";
const router = express.Router();

router.get("/", manufacturerController.getAllManufacturers);
router.post("/add-manufacture", manufacturerController.addManufacturer);
router.put("/update-manufacture/:id", manufacturerController.updateManufacturer);
router.delete("/delete-manufacture/:id", manufacturerController.deleteManufacturer);

export default router;
