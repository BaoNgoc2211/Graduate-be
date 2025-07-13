// routes/cartDetail.route.ts
import { Router } from "express";
import orderDetailController from "../../controller/order/order-detail.controller";
import orderController from "../../controller/order/order.controller";
import { protect } from "../../middleware/auth.middleware";
import { handlePaymentResponse } from "../../service/vnpay.services";
const router = Router();


//status order

//lấy tất cả đơn hàng theo trang thai của user
router.get("/status/",protect, orderController.checkStatusAll);
//lấy đơn hàng theo trạng thái của user
router.get("/status/:status/",protect, orderController.checkStatus);


//orderdetail
//này k cần thiết vì khi đặt hàng thành công sẽ tạo ra chi tiết đơn hàng rồi
router.post("/orderdetail/", orderDetailController.create);
//lấy tất cả chi tiết đơn hàng
router.get("/orderdetail/", orderDetailController.getAll);
//xem chi tiết đơn hàng
router.get("/orderdetail/:id", orderDetailController.getById);
// router.get("/user/:userId", orderDetailController.getByUserId);

router.put("/orderdetail/:id", orderDetailController.update);
router.delete("orderdetail/:id", orderDetailController.delete);

router.put("/:id", orderController.update);
//order
// router.post("/", orderController.create);

//lấy tất cả đơn hàng của admin
router.get("/", orderController.getAll);
//lấy đơn hàng theo id này chỉ là đơn hàng thôi trg đơn hàng có chi tiết đơn hàng
router.get("/:id", orderController.getById);
//xem lại sản phẩm đã chọn thanh toán
router.post("/review/", protect, orderController.reviewOrder);
//thanh toán đơn hàng
router.post("/review/checkout/",protect, orderController.checkOut);
//thanh toán đơn hàng htnafh cong
router.get("/checkout/success",handlePaymentResponse );


router.delete("/:id", orderController.delete);
// Thêm endpoint callback xử lý khi thanh toán VNPAY thành công

export default router;
