// routes/cartDetail.route.ts
import { Router } from "express";
import cartDetailController from "../controller/order/cart-detail.controller";
// import cartDetailController from "../controller/order/cart-detail.controller";
const router = Router();

router.post("/", cartDetailController.create);
router.get("/", cartDetailController.getAll);
// router.get("/:id", cartDetailController.getById);
router.get("/user/:userId", cartDetailController.getByUserId);
router.put("/:id", cartDetailController.update);
router.delete("/:id", cartDetailController.delete);

export default router;
