import { Router } from "express";
import stockController from "../../controller/stock/stock.controller";
const router = Router();
router.get("/", stockController.getAll);
router.get("/low-stock", stockController.getLowStock);
router.get("/medicine/:medicine_id", stockController.getStockByMedicineId);
router.post("/", stockController.create);
router.delete("/:id", stockController.delete);

export default router;
