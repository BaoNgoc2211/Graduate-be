import { Router } from "express";
import stockController from "../../../controller/stock/stock.controller";
// import stockController from "../controller/stock/stock.controller";
const router = Router();
router.post("/", stockController.create);
router.get("/", stockController.getAll);
router.put("/:id", stockController.update);
router.delete("/:id", stockController.delete);
router.get("/:id", stockController.getById);

export default router;
