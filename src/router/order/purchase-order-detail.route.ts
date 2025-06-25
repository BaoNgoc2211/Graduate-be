import { Router } from "express";
import purchaseOrderDetailController from "../../controller/order/purchase-order-detail.controller";

const router = Router();
    router.get("/", purchaseOrderDetailController.getAll);
    router.get("/:id", purchaseOrderDetailController.getById);
    router.post("/", purchaseOrderDetailController.create);
    router.put("/:id", purchaseOrderDetailController.update);
    router.delete("/:id", purchaseOrderDetailController.delete);
export default router;