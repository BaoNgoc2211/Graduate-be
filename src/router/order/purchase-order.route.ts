import { Router } from "express";
import purchaseOrderController from "../../controller/order/purchase-order.controller";

const router = Router();
router.get("/", purchaseOrderController.getAll);
router.get("/:id", purchaseOrderController.getById);
router.post("/", purchaseOrderController.create);
router.put("/:id", purchaseOrderController.update);
router.delete("/:id", purchaseOrderController.delete);
export default router;
