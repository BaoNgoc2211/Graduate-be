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
router.get("/status/:status/",protect, orderController.checkStatusUser);
//chỉnh sửa trạng thái
// router.put("/update/",orderController.updateStatus);
router.post("/review/", protect, orderController.reviewOrder);
//thanh toán đơn hàng
router.post("/review/checkout/",protect, orderController.checkOut);
//thanh toán đơn hàng htnafh cong
router.get("/checkout/success",handlePaymentResponse );



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

//order
// router.post("/", orderController.create);

//lấy tất cả đơn hàng của admin
router.get("/admin", orderController.getAllOrder);
//lấy tất cả đơn hàng theo trạng thái admin
router.get("/admin/status/:status/", orderController.checkOrderStatus);
//lấy đơn hàng theo id này chỉ là đơn hàng thôi trg đơn hàng có chi tiết đơn hàng
router.get("/admin/:id", orderController.getById);
//chỉnh sửa trạng thái admin
router.put("/admin/updatestatus/:id",orderController.updateStatus);
//xem lại sản phẩm đã chọn thanh toán


router.delete("/:id", orderController.delete);
// Thêm endpoint callback xử lý khi thanh toán VNPAY thành công

export default router;
