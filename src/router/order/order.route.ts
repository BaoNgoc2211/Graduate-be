// routes/cartDetail.route.ts
import { Router } from "express";
import orderDetailController from "../../controller/order/order-detail.controller";
import orderController from "../../controller/order/order.controller";
import { protect } from "../../middleware/auth.middleware";
const router = Router();


//status order
router.get("/status/",protect, orderController.checkStatusAll);
router.get("/status/:userId/:status", orderController.checkStatus);


//orderdetail
router.post("/orderdetail/", orderDetailController.create);
router.get("/orderdetail/", orderDetailController.getAll);
router.get("/orderdetail/:id", orderDetailController.getById);
// router.get("/user/:userId", orderDetailController.getByUserId);
router.put("/orderdetail/:id", orderDetailController.update);
router.delete("orderdetail/:id", orderDetailController.delete);

router.put("/:id", orderController.update);
//order
// router.post("/", orderController.create);
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.post("/review/", protect, orderController.reviewOrder);
router.post("/review/checkout/",protect, orderController.checkOut);
// router.get("/user/:userId", orderDetailController.getByUserId);

router.delete("/:id", orderController.delete);

export default router;
