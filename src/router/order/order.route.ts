// routes/cartDetail.route.ts
import { Router } from "express";
import orderDetailController from "../../controller/order/order-detail.controller";
import orderController from "../../controller/order/order.controller";
import { protect } from "../../middleware/auth.middleware";
import { handlePaymentResponse } from "../../service/vnpay.services";
const router = Router();


//status order
router.get("/status/",protect, orderController.checkStatusAll);
router.get("/status/:status/",protect, orderController.checkStatus);


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
// router.get("/vnpay/callback", handlePaymentResponse); // Callback endpoint for VNPAY
router.get("/checkout/success",handlePaymentResponse );
// router.get("/user/:userId", orderDetailController.getByUserId);

router.delete("/:id", orderController.delete);
// Thêm endpoint callback xử lý khi thanh toán VNPAY thành công

export default router;
