import { Router } from "express";
import stockController from "../../controller/stock/stock.controller";
// import stockController from "../controller/stock/stock.controller";
const router = Router();
router.post("/", stockController.create);
router.get("/", stockController.getAll);
// router.put("/:id", stockController.update);
router.delete("/:id", stockController.delete);
router.get("/lowstock", stockController.getLowStock);
router.get("/medicine/:id", stockController.getStockByMedicineId);

export default router;
